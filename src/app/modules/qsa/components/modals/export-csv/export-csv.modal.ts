import { Component, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormControl, FormGroup } from '@angular/forms'
import { TableView } from '../../../model/table/table.view'
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv'
import { SystemView } from '../../../model/system/system.view'
import { Logger } from '../../../services/logger'
import { TranslateService } from '@ngx-translate/core'
import { SystemFeature } from '../../../model/system/system.feature'

@Component({
    selector: 'export-csv-modal',
    templateUrl: './export-csv.modal.html'
})
export class ExportCsvModal {
    @Input() systemTableView: TableView
    @Input() systemView: SystemView
    @Input() systemInputs: any
    @Input() systemViewInputs: SystemFeature[]

    public formControl = new FormGroup({
        inputsOfSystem: new FormControl(),
        id: new FormControl(),
        name: new FormControl(),
        description: new FormControl()
    })

    public properties = [
        {
            id: 'inputsOfSystem',
            valueKey: 'inputsOfSystemExport'
        },
        {
            id: 'id',
            valueKey: 'idOfSystemProperty'
        },
        {
            id: 'name',
            valueKey: 'nameOfSystemProperty'
        },
        {
            id: 'description',
            valueKey: 'descriptionOfSystemProperty'
        }
    ]

    constructor(public activeModal: NgbActiveModal, public translateService: TranslateService) {}

    public exportToCSV(): void {
        this.translateService.get('inputsOfSystemExport').subscribe(inputsText => {
            this.translateService.get('outputsOfSystemExport').subscribe(outputsText => {
                const data = this.mapToCSV(inputsText, outputsText)
                const fileName = this.getFileName()
                new Angular5Csv(data, fileName)
                Logger.i(this, 'Export to CSV modal closing after export')
                this.closeModal()
            })
        })
    }

    private getFileName(): string {
        return 'QSA - '.concat(this.systemView.id)
    }

    private mapToCSV(inputsText: string, outputsText: string): Array<any> {
        const data = new Array<any>()
        if (this.formControl.controls['inputsOfSystem'].value) {
            const row = {}
            this.addColumnToRow(row, 'inputsText', inputsText)
            data.push(row)
            Object.keys(this.systemInputs).forEach(key => {
                const inputRow = {}
                this.addColumnToRow(inputRow, this.formControl.controls['id'].value ? key + 'OfInputId' : null, key)
                this.addColumnToRow(
                    inputRow,
                    this.formControl.controls['name'].value ? key + 'OfInputName' : null,
                    this.systemViewInputs.filter(systemFeature => systemFeature.id === key)[0].name
                )
                this.addColumnToRow(
                    inputRow,
                    this.formControl.controls['description'].value ? key + 'OfInputDescription' : null,
                    this.systemViewInputs.filter(systemFeature => systemFeature.id === key)[0].description
                )
                this.addColumnToRow(inputRow, key + 'OfInputValue', '' + this.systemInputs[key])
                data.push(inputRow)
            })
        }
        const row = {}
        this.addColumnToRow(row, 'outputsText', outputsText)
        data.push(row)
        this.systemTableView.systemOutputs.forEach(value => {
            const row = {}
            this.addColumnToRow(row, this.formControl.controls['id'].value ? 'id' : null, value.id)
            this.addColumnToRow(row, this.formControl.controls['name'].value ? 'name' : null, value.name)
            this.addColumnToRow(
                row,
                this.formControl.controls['description'].value ? 'description' : null,
                value.description
            )
            this.addColumnToRow(row, 'value', value.values[0])
            data.push(row)
        })
        return data
    }

    private addColumnToRow(csvDataRow: any, name: string, property: any): void {
        if (name) {
            csvDataRow[name] = property
        }
    }

    private closeModal(): void {
        this.activeModal.close()
    }
}
