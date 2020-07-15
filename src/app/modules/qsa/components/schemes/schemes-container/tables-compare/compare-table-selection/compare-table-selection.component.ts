import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { TablesService } from '../../../../../services/tables.service'
import { SchemesService } from '../../../../../services/schemes.service'
import { BackendService } from '../../../../../services/backend.service'
import { FormControl, FormGroup } from '@angular/forms'
import { TablesCompareService } from '../../../../../services/tables-compare.service'
import { TableView } from '../../../../../model/table/table.view'
import { TableViewCompare } from '../../../../../model/table/table.view-compare'
import { TabType } from '../../../../../model/tab/tab'
import { Logger } from '../../../../../services/logger'

@Component({
    selector: 'compare-table-selection-component',
    templateUrl: './compare-table-selection.component.html',
})
export class CompareTableSelectionComponent implements OnInit {
    @Input() currentTab: number
    @Output() onTableCompareCreated: EventEmitter<
        TableViewCompare
    > = new EventEmitter<TableViewCompare>()

    public formGroup = new FormGroup({})

    constructor(
        private backendService: BackendService,
        private tablesService: TablesService,
        private schemesService: SchemesService,
        private compareTableViewService: TablesCompareService
    ) {}

    private static copyObject<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj))
    }

    public ngOnInit(): void {
        this.getTableViewTabIndexes().forEach((value) =>
            this.formGroup.addControl('' + value, new FormControl(false))
        )
    }

    public isTwoTablesAreSelected(): boolean {
        return (
            this.getTableViewTabIndexes().filter(
                (tabIndex) => this.formGroup.value['' + tabIndex]
            ).length >= 2
        )
    }

    public setSelectable(): void {
        const isTwoTablesAreSelected = this.isTwoTablesAreSelected()
        this.getTableViewTabIndexes().forEach((tabIndex) => {
            const currentSystemSelected = this.formGroup.value['' + tabIndex]
            if (!isTwoTablesAreSelected || currentSystemSelected) {
                this.formGroup.controls['' + tabIndex].enable()
            } else {
                this.formGroup.controls['' + tabIndex].disable()
            }
        })
    }

    public getTableViews(): TableView[] {
        return Array.from(this.tablesService.getTableViews().values())
    }

    public getTableViewTabIndexes(): number[] {
        return Array.from(this.tablesService.getTableViews().keys())
    }

    public getTableViewsTabName(): string[] {
        return this.getTableViewTabIndexes().map(
            (tabIndex) => this.schemesService.getTabs()[tabIndex].name
        )
    }

    public getTableViewSelectedTabNames(): string[] {
        return this.getTableViewTabIndexes()
            .filter((tabIndex) => this.formGroup.value['' + tabIndex])
            .map((tabIndex) => this.schemesService.getTabs()[tabIndex].name)
    }

    public isEnoughTableViewsAreAvailable(): boolean {
        return this.getTableViews().length >= 2
    }

    public processCompareTableScheme(): void {
        Logger.i(this, 'Selected table indexes', this.formGroup.value)
        const tableViewCompare = this.createTableViewCompare()
        this.compareTableViewService.addTableViewCompare(
            tableViewCompare,
            this.currentTab
        )
        this.schemesService.getSelectedTab(this.currentTab).type =
            TabType.COMPARE_TABLE
        this.schemesService.getOnChangedListener().next(this.currentTab)
        this.onTableCompareCreated.emit(tableViewCompare)
    }

    private createTableViewCompare(): TableViewCompare {
        const tableViews = CompareTableSelectionComponent.copyObject(
            this.getSelectedTableView()
        )
        const tabNames = CompareTableSelectionComponent.copyObject(
            this.getTableViewSelectedTabNames()
        )
        Logger.i(this, 'Selected tables', tableViews)
        Logger.i(this, 'Selected tabs', tabNames)
        return new TableViewCompare(
            tableViews[0],
            tableViews[1],
            tabNames[0],
            tabNames[1]
        )
    }

    private getSelectedTableView(): TableView[] {
        return this.getTableViewTabIndexes()
            .filter((tabIndex) => this.formGroup.value['' + tabIndex])
            .map((tabIndex) => this.tablesService.getTableView(tabIndex))
    }
}
