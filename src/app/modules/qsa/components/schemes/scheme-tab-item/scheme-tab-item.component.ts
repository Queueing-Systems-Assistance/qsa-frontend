import { Component, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Tab, TabType } from '../../../model/tab/tab'
import { SchemesService } from '../../../services/schemes.service'
import { RenameModal } from '../../modals/rename/rename.modal'
import { Logger } from '../../../services/logger'
import { TabChangeModal } from '../../modals/tab-change/tab-change.modal'
import { TablesService } from '../../../services/tables.service'
import { ChartsService } from '../../../services/charts.service'
import { TabDeleteModal } from '../../modals/tab-delete/tab-delete.modal'
import { TablesCompareService } from '../../../services/tables-compare.service'

@Component({
    selector: 'scheme-tab-item-component',
    templateUrl: './scheme-tab-item.component.html'
})
export class SchemeTabItem {
    @Input() tab: Tab
    @Input() index: number

    private TabType = TabType

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private schemesService: SchemesService,
        private chartsService: ChartsService,
        private tablesService: TablesService,
        private compareTableService: TablesCompareService,
        private modalService: NgbModal
    ) {}

    private static handleModalDismissWithLog(reason: any): void {
        Logger.i(this, 'Modal close reason', reason)
    }

    private static updateMap(index: number, value: any, map: Map<any, any>): void {
        map.set(index, value)
        map.set(index + 1, undefined)
    }

    public onCloseTab(): void {
        this.modalService.open(TabDeleteModal).result.then(
            result => {
                Logger.i(this, 'Modal [DELETE] result', result)
                if (result) {
                    this.schemesService.deleteTab(this.index)
                    this.schemesService.selectedTab(this.index - 1)
                    this.router.navigate([this.index - 1], { relativeTo: this.route })
                    this.updateCachedData()
                }
            },
            reason => SchemeTabItem.handleModalDismissWithLog(reason)
        )
    }

    public onRename(): void {
        this.modalService.open(RenameModal).result.then(
            result => {
                Logger.i(this, 'Modal [RENAME] result', result)
                if (result) {
                    this.schemesService.getTabs()[this.index].name = result
                }
            },
            reason => SchemeTabItem.handleModalDismissWithLog(reason)
        )
    }

    public onChangeTabType(): void {
        this.modalService.open(TabChangeModal).result.then(
            result => {
                Logger.i(this, 'Modal [CHANGE] result', result)
                if (result) {
                    this.schemesService.getTabs()[this.index].type = TabType.DEFAULT
                    this.updateCachedData()
                }
            },
            reason => SchemeTabItem.handleModalDismissWithLog(reason)
        )
    }

    public onSelectedTab(): void {
        this.schemesService.selectedTab(this.index)
    }

    private updateCachedData(): void {
        this.updateTablesService()
        this.updateChartService()
        this.updateCompareTable()
    }

    private updateTablesService(): void {
        this.tablesService.deleteSystemViewsForm(this.index)
        this.tablesService.deleteSystemInputsForm(this.index)
        this.tablesService.deleteSystemViewInputs(this.index)
        this.tablesService.deleteTableView(this.index)
        this.tablesService.deleteSystemView(this.index)
        // Need to shift all the elements by one
        this.shiftValues(this.tablesService.getSystemViewsForms(), currentIndex =>
            this.tablesService.getSystemViewsForm(currentIndex)
        )
        this.shiftValues(this.tablesService.getSystemViewInputsAll(), currentIndex =>
            this.tablesService.getSystemViewInputs(currentIndex)
        )
        this.shiftValues(this.tablesService.getSystemViewInputsAll(), currentIndex =>
            this.tablesService.getSystemViewInputs(currentIndex)
        )
        this.shiftValues(this.tablesService.getTableViews(), currentIndex =>
            this.tablesService.getTableView(currentIndex)
        )
        this.shiftValues(this.tablesService.getSystemViews(), currentIndex =>
            this.tablesService.getSystemView(currentIndex)
        )
    }

    private updateChartService(): void {
        this.chartsService.deleteSystemViewsForm(this.index)
        this.chartsService.deleteSystemInputsForm(this.index)
        this.chartsService.deleteSystemViewInputs(this.index)
        this.chartsService.deleteSystemView(this.index)
        this.chartsService.deleteChartData(this.index)
        this.shiftValues(this.chartsService.getSystemViewsForms(), currentIndex =>
            this.chartsService.getSystemViewsForm(currentIndex)
        )
        this.shiftValues(this.chartsService.getSystemViewInputsAll(), currentIndex =>
            this.chartsService.getSystemViewInputs(currentIndex)
        )
        this.shiftValues(this.chartsService.getSystemViewInputsAll(), currentIndex =>
            this.chartsService.getSystemViewInputs(currentIndex)
        )
        this.shiftValues(this.chartsService.getSystemViews(), currentIndex =>
            this.chartsService.getSystemView(currentIndex)
        )
        this.shiftValues(this.chartsService.getChartDatas(), currentIndex =>
            this.chartsService.getChartData(currentIndex)
        )
    }

    private updateCompareTable(): void {
        this.compareTableService.removeTableViewCompare(this.index)
        this.shiftValues(this.compareTableService.getTableViewCompares(), currentIndex =>
            this.compareTableService.getTableViewCompare(currentIndex)
        )
    }

    private shiftValues(map: Map<number, any>, func: (currentIndex: number) => any): void {
        Array.from(map.keys())
            .filter(currentIndex => currentIndex >= this.index)
            .forEach(currentIndex => SchemeTabItem.updateMap(currentIndex - 1, func(currentIndex), map))
    }
}
