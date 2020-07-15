import { TableView } from './table.view'

export class TableViewCompare {
    tableView1: TableView
    tableView2: TableView

    tabName1: string
    tabName2: string

    constructor(
        tableView1: TableView,
        tableView2: TableView,
        tabName1: string,
        tabName2: string
    ) {
        this.tableView1 = tableView1
        this.tableView2 = tableView2
        this.tabName1 = tabName1
        this.tabName2 = tabName2
    }
}
