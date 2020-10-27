import { Component, Input } from '@angular/core'
import { TableView } from '../../../../../model/table/table.view'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ExportCsvModal } from '../../../../modals/export-csv/export-csv.modal'
import { SystemView } from '../../../../../model/system/system.view'
import { CalculationModal } from '../../../../modals/calculation/calculation.modal'
import { NotificationService } from 'src/app/modules/qsa/services/notification.service'
import { NumberService } from 'src/app/modules/qsa/services/number.service'

@Component({
    selector: 'tab-table-component',
    templateUrl: './tab-table.component.html'
})
export class TabTableComponent {
    @Input() systemView: SystemView
    @Input() systemTableView: TableView

    constructor(private modalService: NgbModal, private notificationService: NotificationService, private numberService: NumberService) {}

    public exportToCSV(): void {
        const modalRef = this.modalService.open(ExportCsvModal)
        modalRef.componentInstance.systemTableView = this.systemTableView
        modalRef.componentInstance.systemView = this.systemView
    }

    public isErrorMessage(value: string): boolean {
        return !this.numberService.isNumber(value)
    }

    public roundValue(value: string): string {
        return this.numberService.getSimplestForm(value)
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
