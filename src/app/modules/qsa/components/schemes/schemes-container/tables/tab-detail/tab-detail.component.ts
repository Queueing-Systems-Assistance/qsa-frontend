import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { BackendService } from '../../../../../services/backend.service'
import { TablesService } from '../../../../../services/tables.service'
import { SystemFeature } from '../../../../../model/system/system.feature'
import { SystemViewService } from '../../../../../services/system.view.service'
import { SystemView } from '../../../../../model/system/system.view'
import { TableView } from '../../../../../model/table/table.view'

@Component({
    selector: 'tab-detail-component',
    templateUrl: './tab-detail.component.html'
})
export class TabDetailComponent implements OnInit {
    private currentTab: number
    private requestLoading: boolean

    constructor(
        private route: ActivatedRoute,
        private tablesService: TablesService,
        private backendService: BackendService,
        private systemViewService: SystemViewService
    ) {}

    public ngOnInit(): void {
        this.subscribeRouteChanging()
    }

    public isRequestLoading(): boolean {
        return this.requestLoading
    }

    public getSystemViews(): SystemView[] {
        return this.systemViewService.getSystemViews()
    }

    public isSystemViewsLoaded(): boolean {
        return this.systemViewService.isSystemViewsLoaded()
    }

    public getSystemViewInputs(): SystemFeature[] {
        return this.tablesService.getSystemViewInputs(this.currentTab)
    }

    public getRequiredSystemViewInputs(): SystemFeature[] {
        return this.getSystemViewInputs().filter(systemViewInput => systemViewInput.required)
    }

    public getNonRequiredSystemViewInputs(): SystemFeature[] {
        return this.getSystemViewInputs().filter(systemViewInput => !systemViewInput.required)
    }

    public getSystemInputForm(): FormGroup {
        return this.tablesService.getSystemInputsForm(this.currentTab)
    }

    public getSystemViewsForm(): FormGroup {
        return this.tablesService.getSystemViewsForm(this.currentTab)
    }

    public getSystemTableView(): TableView {
        return this.tablesService.getTableView(this.currentTab)
    }

    public getSystemViewName(): string {
        return this.getSystemView().name
    }

    public calculateSystemFeatures(): void {
        this.requestLoading = true
        this.backendService.getTable(this.getSystemInputForm().value, this.getSystemViewId()).subscribe(
            value => {
                value.systemView = this.getSystemView()
                return this.tablesService.addTableView(this.currentTab, value)
            },
            () => (this.requestLoading = false),
            () => (this.requestLoading = false)
        )
    }

    public getSystemInputLayouts(id: string): void {
        this.tablesService.addSystemView(this.currentTab, this.systemViewService.getSystemViewById(id))
        this.tablesService.deleteTableView(this.currentTab)
        this.requestLoading = true
        this.backendService.getInput(id).subscribe(
            result => this.updateSystemInputForms(result),
            null,
            () => (this.requestLoading = false)
        )
    }

    public getSystemView(): SystemView {
        return this.tablesService.getSystemView(this.currentTab)
    }

    private subscribeRouteChanging(): void {
        this.route.params.subscribe((params: Params) => {
            this.currentTab = +params['id']
            // System List
            this.updateSystemViewForms()
            // System View Inputs Forms
            this.updateSystemInputForms(null)
        })
    }

    private updateSystemViewForms(): void {
        if (!this.getSystemViewsForm()) {
            const newSystemViewsForm = new FormGroup({ systemViewSelected: new FormControl(null) })
            this.tablesService.addSystemViewsForm(this.currentTab, newSystemViewsForm)
        }
    }

    private updateSystemInputForms(systemViewInputs: Array<SystemFeature>): void {
        if ((!this.getSystemInputForm() && systemViewInputs) || systemViewInputs) {
            const newInputFormGroup = new FormGroup({})
            systemViewInputs.forEach(systemInput => {
                newInputFormGroup.addControl(systemInput.id, new FormControl(0))
            })
            this.tablesService.addSystemInputsForm(this.currentTab, newInputFormGroup)
            this.tablesService.addSystemViewInputs(this.currentTab, systemViewInputs)
        }
    }

    private getSystemViewId(): string {
        return this.getSystemView().id
    }
}
