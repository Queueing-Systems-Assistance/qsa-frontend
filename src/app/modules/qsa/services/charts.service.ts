import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { SystemFeature } from '../model/system/system.feature'
import { SystemView } from '../model/system/system.view'
import { ChartData } from '../model/chart/chart.data'

@Injectable()
export class ChartsService {
    private systemViewsForms = new Map<number, FormGroup>()
    private systemInputsForms = new Map<number, FormGroup>()
    private systemViewInputs = new Map<number, Array<SystemFeature>>()
    private systemViews = new Map<number, SystemView>()
    private chartData = new Map<number, ChartData>()

    /* SYSTEM VIEWS */

    public getSystemView(index: number): SystemView {
        return this.systemViews.get(index)
    }

    public addSystemView(index: number, systemView: SystemView): void {
        this.systemViews.set(index, systemView)
    }

    public deleteSystemView(index: number): void {
        this.systemViews.delete(index)
    }

    public getSystemViews(): Map<number, SystemView> {
        return this.systemViews
    }

    /* SYSTEM VIEWS FORM */

    public getSystemViewsForm(index: number): FormGroup {
        return this.systemViewsForms.get(index)
    }

    public addSystemViewsForm(index: number, systemViewForm: FormGroup): void {
        this.systemViewsForms.set(index, systemViewForm)
    }

    public deleteSystemViewsForm(index: number): void {
        this.systemViewsForms.delete(index)
    }

    public getSystemViewsForms(): Map<number, FormGroup> {
        return this.systemViewsForms
    }

    /* SYSTEM INPUTS */

    public getSystemViewInputs(index: number): SystemFeature[] {
        return this.systemViewInputs.get(index)
    }

    public addSystemViewInputs(
        index: number,
        systemViewInputs: Array<SystemFeature>
    ): void {
        this.systemViewInputs.set(index, systemViewInputs)
    }

    public deleteSystemViewInputs(index: number): void {
        this.systemViewInputs.delete(index)
    }

    public isSystemViewInputsLoaded(index: number) {
        return this.getSystemViewInputs(index)
    }

    public getSystemViewInputsAll(): Map<number, SystemFeature[]> {
        return this.systemViewInputs
    }

    /* SYSTEM INPUTS FORM */

    public getSystemInputsForm(index: number): FormGroup {
        return this.systemInputsForms.get(index)
    }

    public addSystemInputsForm(
        index: number,
        systemInputForm: FormGroup
    ): void {
        this.systemInputsForms.set(index, systemInputForm)
    }

    public deleteSystemInputsForm(index: number): void {
        this.systemInputsForms.delete(index)
    }

    public getSystemInputsForms(): Map<number, FormGroup> {
        return this.systemInputsForms
    }

    /* CHART DATA */

    public getChartData(index: number): ChartData {
        return this.chartData.get(index)
    }

    public addChartData(index: number, chartData: ChartData): void {
        this.chartData.set(index, chartData)
    }

    public deleteChartData(index: number): void {
        this.chartData.delete(index)
    }

    public getChartDatas(): Map<number, ChartData> {
        return this.chartData
    }
}
