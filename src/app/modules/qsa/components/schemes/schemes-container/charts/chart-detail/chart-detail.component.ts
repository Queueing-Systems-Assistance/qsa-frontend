import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { BackendService } from '../../../../../services/backend.service'
import { ChartsService } from '../../../../../services/charts.service'
import { Logger } from '../../../../../services/logger'
import { SystemFeature } from '../../../../../model/system/system.feature'
import { SystemViewService } from '../../../../../services/system.view.service'
import { SystemView } from '../../../../../model/system/system.view'
import { ChartFigureComponent } from '../chart-figure/chart-figure.component'
import { ChartData } from '../../../../../model/chart/chart.data'
import { InputGroup } from 'src/app/modules/qsa/model/system/input-group.enum'

@Component({
    selector: 'chart-detail-component',
    templateUrl: './chart-detail.component.html'
})
export class ChartDetailComponent implements OnInit {
    @ViewChild(ChartFigureComponent) chartFigure: ChartFigureComponent

    currentTab: number
    yAxisGridEnabled = true

    constructor(
        private route: ActivatedRoute,
        private chartsService: ChartsService,
        private backendService: BackendService,
        private systemViewService: SystemViewService
    ) {}

    public toggleYAxisGrid(): void {
        this.yAxisGridEnabled = !this.yAxisGridEnabled
    }

    public ngOnInit(): void {
        this.subscribeRouteChanging()
    }

    public getSystemViewId(): string {
        return this.getSystemView().id
    }

    public getSystemViewName(): string {
        return this.getSystemView().name
    }

    public selectSystem(systemViewId: string): void {
        // Save selected system
        this.chartsService.addSystemViewsForm(this.currentTab, this.getSystemViewsForm())
        this.chartsService.addSystemView(this.currentTab, this.systemViewService.getSystemViewById(systemViewId))
        this.chartFigure.removeChart()
        this.chartsService.deleteChartData(this.currentTab)
        this.backendService.getInput(systemViewId).subscribe(result => {
            // Save selected system inputs
            this.chartsService.addSystemViewInputs(this.currentTab, result.data.systemElements[0].inputs)
            this.updateSystemInputsForms(true)
        })
    }

    public selectXAxisSystemInput(): void {
        this.removeChart()
        this.addDynamicInputForms(this.createDynamicInputForms())
    }

    public calculateSystemFeatures(): void {
        const values = this.getSystemInputsForm().value
        const formData = {
            features: values[this.getSystemViewId()],
            xAxis: {
                from: values.xAxis.from,
                to: values.xAxis.to,
                steps: values.xAxis.steps
            }
        }
        this.backendService
            .getChart(formData, this.getSystemViewId(), values.xAxis.featureId)
            .subscribe(value => this.updateChartView(value.data.systemElements[0]))
    }

    public getSystemViews(): Array<SystemView> {
        return this.systemViewService.getSystemViews()
    }

    public isSystemViewsLoaded(): boolean {
        return this.systemViewService.isSystemViewsLoaded()
    }

    public getSystemViewsForm(): FormGroup {
        return this.chartsService.getSystemViewsForm(this.currentTab)
    }

    public getSystemViewInputs(): Array<SystemFeature> {
        return this.chartsService.getSystemViewInputs(this.currentTab)
    }

    public isSystemViewInputsLoaded(): SystemFeature[] {
        return this.chartsService.isSystemViewInputsLoaded(this.currentTab)
    }

    public getSystemInputsForm(): FormGroup {
        return this.chartsService.getSystemInputsForm(this.currentTab)
    }

    public isXAxisSelected(): boolean {
        const featureId = this.chartsService.getSystemInputsForm(this.currentTab).value.xAxis.featureId
        return featureId && this.chartsService.getSystemInputsForm(this.currentTab).value[this.getSystemViewId()]
    }

    public getRequiredFixSystemInputs(): SystemFeature[] {
        return this.createFixSystemInputs().filter(
            systemViewInput => systemViewInput.inputGroup === InputGroup.INPUT_GROUP_REQUIRED
        )
    }

    public getNonRequiredFixSystemInputs(): SystemFeature[] {
        return this.createFixSystemInputs().filter(
            systemViewInput => systemViewInput.inputGroup === InputGroup.INPUT_GROUP_OPTIONAL
        )
    }

    public getSelectedSystemFeature(): SystemFeature {
        return this.getSystemViewInputs()
            .filter(systemInput => this.getFeatureId() === systemInput.id)
            .pop()
    }

    public getXAxisName(): string {
        let xAxisName = ''
        if (this.getSystemViewInputs()) {
            xAxisName = this.getSystemViewInputs()
                .filter(systemViewInput => this.getFeatureId() === systemViewInput.id)
                .map(systemViewInput => systemViewInput.name)
                .pop()
        }
        return xAxisName
    }

    private getSystemView(): SystemView {
        return this.chartsService.getSystemView(this.currentTab)
    }

    private updateChartView(value): void {
        const chartData = new ChartData()
        const systemElement = new SystemView()
        systemElement.name = value.name
        chartData.systemElement = systemElement
        chartData.labels = value.outputsStream.stream
        chartData.systemOutputs = value.outputsStream.outputFeatures
        this.chartsService.addChartData(this.currentTab, chartData)
        this.chartFigure.createChart(this.getXAxisName(), chartData, this.yAxisGridEnabled)
    }

    private subscribeRouteChanging(): void {
        this.route.params.subscribe((params: Params) => {
            this.currentTab = +params['id']
            // System List Forms
            this.updateSystemViewsForms()
            // System View Inputs Forms
            this.updateSystemInputsForms(false)
            // Chart
            this.updateChart()
        })
    }

    private updateChart(): void {
        const chart = this.getChartData()
        if (chart) {
            // If the user switches tab too fast, HighChart cannot render, and throws error
            const currentTab = this.currentTab
            setTimeout(() => {
                if (currentTab === this.currentTab) {
                    this.chartFigure.createChart(this.getXAxisName(), chart, this.yAxisGridEnabled)
                }
            }, 500)
        }
    }

    private updateSystemViewsForms(): void {
        const savedSystemViewsForm = this.getSystemViewsForm()
        Logger.i(this, 'Saved system views form', savedSystemViewsForm)
        if (!savedSystemViewsForm) {
            this.chartsService.addSystemViewsForm(
                this.currentTab,
                new FormGroup({ systemViewSelected: new FormControl() })
            )
        }
    }

    private updateSystemInputsForms(newInputs: boolean): void {
        if ((!this.getSystemInputsForm() && this.getSystemViewInputs()) || newInputs) {
            this.createXAxisForms()
        }
    }

    private updateXAxisForms(): void {
        this.getSystemInputsForm().controls['xAxis'].patchValue({
            from: 0,
            to: 0,
            steps: 0
        })
    }

    private createXAxisForms(): void {
        this.removeChart()
        Logger.i(this, 'Create X axis forms')
        const systemInputsForm = new FormGroup({
            xAxis: new FormGroup({
                featureId: new FormControl(),
                from: new FormControl(0),
                to: new FormControl(0),
                steps: new FormControl(0)
            })
        })
        this.chartsService.addSystemInputsForm(this.currentTab, systemInputsForm)
    }

    private removeChart(): void {
        Logger.i(this, 'Remove chart')
        const chart = this.getChartData()
        if (chart) {
            this.chartsService.deleteChartData(this.currentTab)
        }
    }

    private addDynamicInputForms(dynamicInputForms: FormGroup): void {
        if (!this.isXAxisSelected()) {
            this.getSystemInputsForm().removeControl(this.getSystemViewId())
            this.getSystemInputsForm().addControl(this.getSystemViewId(), dynamicInputForms)
        }
        this.getSystemViewInputs().forEach(systemInput => (this.getSystemInputsForm()[systemInput.id] = 0))
    }

    private createFixSystemInputs(): Array<SystemFeature> {
        return this.getSystemViewInputs().filter(systemInput => this.getFeatureId() !== systemInput.id)
    }

    private createDynamicInputForms(): FormGroup {
        const dynamicForms = new FormGroup({})
        this.getSystemViewInputs().forEach(systemInput => dynamicForms.addControl(systemInput.id, new FormControl(0)))
        return dynamicForms
    }

    private getChartData(): ChartData {
        return this.chartsService.getChartData(this.currentTab)
    }

    private getFeatureId() {
        if (this.getSystemInputsForm() === undefined || this.getSystemInputsForm().value.xAxis === undefined) {
            return null
        }
        return this.getSystemInputsForm().value.xAxis.featureId
    }
}
