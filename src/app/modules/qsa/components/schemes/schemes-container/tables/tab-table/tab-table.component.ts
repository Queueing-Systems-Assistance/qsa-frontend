import { Component, Input } from '@angular/core'
import { TableView } from '../../../../../model/table/table.view'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ExportCsvModal } from '../../../../modals/export-csv/export-csv.modal'
import { SystemView } from '../../../../../model/system/system.view'
import { CalculationModal } from '../../../../modals/calculation/calculation.modal'
import { NotificationService } from 'src/app/modules/qsa/services/notification.service'

const STRING_START = '^'
const SIGN = '[-+]?'
const INTEGRAL_PART_WITH_DOT = '(?:[0-9]{0,30}\\.)?'
const FRACTIONAL_PART = '[0-9]{1,30}'
const SCIENTIFIC_FORM = '(?:[Ee][-+]?[1-2]?[0-9])?'
const STRING_END = '$'

const TRAILING_0: RegExp = /0+$/
const TRAILING_DOT: RegExp = /\.+$/
const EMPTY_STRING = ''
const ZERO = '0'
const PRECISION = 3

const SCIENTIFIC_FORM_DECIMAL_PLACES: RegExp = /(?:[eE]([+-]?\d+))?$/

@Component({
    selector: 'tab-table-component',
    templateUrl: './tab-table.component.html'
})
export class TabTableComponent {
    @Input() systemView: SystemView
    @Input() systemTableView: TableView

    constructor(private modalService: NgbModal, private notificationService: NotificationService) {}

    public exportToCSV(): void {
        const modalRef = this.modalService.open(ExportCsvModal)
        modalRef.componentInstance.systemTableView = this.systemTableView
        modalRef.componentInstance.systemView = this.systemView
    }

    public isErrorMessage(value: string): boolean {
        return !new RegExp(
            STRING_START + SIGN + INTEGRAL_PART_WITH_DOT + FRACTIONAL_PART + SCIENTIFIC_FORM + STRING_END
        ).test(value)
    }

    public isScientificZero(value: string) {
        const decimalPlaces = value.match(SCIENTIFIC_FORM_DECIMAL_PLACES)
        return decimalPlaces[1] && Number.parseInt(decimalPlaces[1]) < -PRECISION
    }

    public roundValue(value: string): string {
        let result: string
        if (this.isScientificZero(value)) {
            result = ZERO
        } else {
            result = parseFloat(value)
                .toPrecision(PRECISION)
                .replace(TRAILING_0, EMPTY_STRING)
                .replace(TRAILING_DOT, EMPTY_STRING)
        }
        return result
    }

    public showErrorMessage(errorMsg: string): void {
        this.notificationService.showToastError([{ errorMessage: errorMsg }])
    }

    public showCalculationModal(systemFeatureId: string, systemFeatureValue: string): void {
        //Currently only System MM1 is supported
        if (this.systemView.id === 'systemMM1') {
            const modalRef = this.modalService.open(CalculationModal)
            modalRef.componentInstance.systemFeatureId = systemFeatureId
            modalRef.componentInstance.systemId = this.systemView.id
            modalRef.componentInstance.result = systemFeatureValue
        } else {
            this.notificationService.showToastInfo('This feature is currently supported in System MM1 only')
        }
    }
}
