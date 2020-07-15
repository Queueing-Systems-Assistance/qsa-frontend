import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { TableView } from '../model/table/table.view'
import { SystemFeature } from '../model/system/system.feature'
import { SystemView } from '../model/system/system.view'

@Injectable()
export class TablesService {
    private systemViewForms = new Map<number, FormGroup>()
    private systemInputForms = new Map<number, FormGroup>()
    private systemViewInputs = new Map<number, Array<SystemFeature>>()
    private systemViews = new Map<number, SystemView>()
    private tableView = new Map<number, TableView>()

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
        return this.systemViewForms.get(index)
    }

    public addSystemViewsForm(index: number, systemViewForm: FormGroup) {
        this.systemViewForms.set(index, systemViewForm)
    }

    public deleteSystemViewsForm(index: number): void {
        this.systemViewForms.delete(index)
    }

    public getSystemViewsForms(): Map<number, FormGroup> {
        return this.systemViewForms
    }

    /* SYSTEM INPUTS FORM */

    public getSystemInputsForm(index: number): FormGroup {
        return this.systemInputForms.get(index)
    }

    public addSystemInputsForm(
        index: number,
        systemInputForm: FormGroup
    ): void {
        this.systemInputForms.set(index, systemInputForm)
    }

    public deleteSystemInputsForm(index: number): void {
        this.systemInputForms.delete(index)
    }

    public getSystemInputsForms(): Map<number, FormGroup> {
        return this.systemInputForms
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

    public getSystemViewInputsAll(): Map<number, SystemFeature[]> {
        return this.systemViewInputs
    }

    /* TABLE */

    public getTableViews(): Map<number, TableView> {
        return this.tableView
    }

    public getTableView(index: number): TableView {
        return this.tableView.get(index)
    }

    public addTableView(index: number, tableView: TableView): void {
        this.tableView.set(index, tableView)
    }

    public deleteTableView(index: number): void {
        this.tableView.delete(index)
    }
}
