import { Component, OnInit } from '@angular/core'
import { TablesCompareService } from '../../../../../services/tables-compare.service'
import { ActivatedRoute, Params } from '@angular/router'
import { TableViewCompare } from '../../../../../model/table/table.view-compare'

@Component({
    selector: 'compare-table-detail-component',
    templateUrl: './compare-table-detail.component.html'
})
export class CompareTableDetailComponent implements OnInit {
    public tableViewCompare: TableViewCompare
    private currentTab: number

    constructor(private route: ActivatedRoute, private tablesCompareService: TablesCompareService) {}

    public ngOnInit(): void {
        this.subscribeRouteChanging()
    }

    public isTableCompareView() {
        return this.tableViewCompare
    }

    public onTableCompareCreated(tableViewCompare): void {
        this.tableViewCompare = tableViewCompare
    }

    private subscribeRouteChanging(): void {
        this.route.params.subscribe((params: Params) => {
            this.currentTab = +params['id']
            this.tableViewCompare = this.tablesCompareService.getTableViewCompare(this.currentTab)
        })
    }
}
