import { Injectable } from '@angular/core'
import { TableViewCompare } from '../model/table/table.view-compare'

@Injectable()
export class TablesCompareService {
    private tableViewCompareMap = new Map<number, TableViewCompare>()

    /* TABLE VIEW COMPARE */

    public getTableViewCompare(index: number): TableViewCompare {
        return this.tableViewCompareMap.get(index)
    }

    public addTableViewCompare(
        tableViewCompare: TableViewCompare,
        index: number
    ): void {
        this.tableViewCompareMap.set(index, tableViewCompare)
    }

    public removeTableViewCompare(index: number): void {
        this.tableViewCompareMap.delete(index)
    }

    public getTableViewCompares(): Map<number, TableViewCompare> {
        return this.tableViewCompareMap
    }
}
