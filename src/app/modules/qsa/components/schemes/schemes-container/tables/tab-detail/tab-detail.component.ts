import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { BackendService } from '../../../../../services/backend.service'
import { TablesService } from '../../../../../services/tables.service'
import { SystemFeature } from '../../../../../model/system/system.feature'
import { SystemViewService } from '../../../../../services/system.view.service'
import { SystemView } from '../../../../../model/system/system.view'
import { TableView } from '../../../../../model/table/table.view'
import { InputGroup } from 'src/app/modules/qsa/model/system/input-group.enum'
import { TranslateService } from '@ngx-translate/core'
import { NotificationService } from 'src/app/modules/qsa/services/notification.service'

const TRUE_STRING = 'true'

@Component({
    selector: 'tab-detail-component',
    templateUrl: './tab-detail.component.html'
})
export class TabDetailComponent implements OnInit {
    public InputGroupEnum = InputGroup
    private currentTab: number

    constructor(
        private route: ActivatedRoute,
        private tablesService: TablesService,
        private backendService: BackendService,
        private systemViewService: SystemViewService,
        private translateService: TranslateService,
        private notificationService: NotificationService
    ) {}

    public ngOnInit(): void {
        this.subscribeRouteChanging()
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

    public getSystemViewInputsByGroup(inputGroup: InputGroup): SystemFeature[] {
        return this.getSystemViewInputs().filter(systemViewInput => systemViewInput.inputGroup === inputGroup)
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

    public validateInput(): void {
        const systemViewInputs = this.getSystemViewInputs()
        const inputValues = this.getSystemInputForm().value
        Object.keys(inputValues).forEach(inputKey => {
            const canBeFractional =
                systemViewInputs.find(systemViewInput => systemViewInput.id === inputKey).typeFraction === TRUE_STRING
            if (!canBeFractional && !Number.isInteger(inputValues[inputKey])) {
                throw new Error(`<b>${inputKey}</b> ${this.translateService.instant('integerValidationError')}`)
            }
        })
    }

    public calculateSystemFeatures(): void {
        try {
            this.validateInput()
            this.backendService.getTable(this.getSystemInputForm().value, this.getSystemViewId()).subscribe(value => {
                const tableView = new TableView()
                tableView.systemOutputs = value.data.systemElements[0].outputs
                tableView.systemView = this.getSystemView()
                return this.tablesService.addTableView(this.currentTab, tableView)
            })
        } catch (error) {
            this.notificationService.showToastError([{ errorMessage: error.message }])
        }
    }

    public getSystemInputLayouts(id: string): void {
        this.tablesService.addSystemView(this.currentTab, this.systemViewService.getSystemViewById(id))
        this.tablesService.deleteTableView(this.currentTab)
        this.backendService
            .getInput(id)
            .subscribe(result => this.updateSystemInputForms(result.data.systemElements[0].inputs))
    }

    public getSystemView(): SystemView {
        return this.tablesService.getSystemView(this.currentTab)
    }

    private subscribeRouteChanging(): void {
        this.route.params.subscribe((params: Params) => {
            this.currentTab = +params['id']
            this.updateSystemViewForms()
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
