import { Component, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormControl, FormGroup } from '@angular/forms'
import { TableView } from '../../../model/table/table.view'
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv'
import { SystemView } from '../../../model/system/system.view'
import { Logger } from '../../../services/logger'

@Component({
    selector: 'export-csv-modal',
    templateUrl: './export-csv.modal.html',
})
export class ExportCsvModal {
    @Input() systemTableView: TableView
    @Input() systemView: SystemView

    public formControl = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        description: new FormControl(),
    })

    public properties = [
        {
            id: 'id',
            valueKey: 'idOfSystemProperty',
        },
        {
            id: 'name',
            valueKey: 'nameOfSystemProperty',
        },
        {
            id: 'description',
            valueKey: 'descriptionOfSystemProperty',
        },
    ]

    constructor(public activeModal: NgbActiveModal) {}

    public exportToCSV(): void {
        const data = this.mapToCSV()
        const fileName = this.getFileName()
        new Angular5Csv(data, fileName)
        Logger.i(this, 'Export to CSV modal closing after export')
        this.closeModal()
    }

    private getFileName(): string {
        return 'QSA - '.concat(this.systemView.id)
    }

    private mapToCSV(): Array<any> {
        const data = new Array<any>()
        this.systemTableView.systemOutputs.forEach((value) => {
            const row = {}
            this.addPropertyToCSVRow(
                row,
                this.formControl.controls['id'].value ? 'id' : null,
                value.id
            )
            this.addPropertyToCSVRow(
                row,
                this.formControl.controls['name'].value ? 'name' : null,
                value.name
            )
            this.addPropertyToCSVRow(
                row,
                this.formControl.controls['description'].value
                    ? 'description'
                    : null,
                value.description
            )
            this.addPropertyToCSVRow(row, 'value', value.values[0])
            data.push(row)
        })
        return data
    }

    private addPropertyToCSVRow(
        csvDataRow: any,
        name: string,
        property: any
    ): void {
        if (name) {
            csvDataRow[name] = property
        }
    }

    private closeModal(): void {
        this.activeModal.close()
    }
}
