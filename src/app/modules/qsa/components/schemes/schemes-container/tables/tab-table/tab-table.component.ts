import { Component, Input } from '@angular/core'
import { TableView } from '../../../../../model/table/table.view'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ExportCsvModal } from '../../../../modals/export-csv/export-csv.modal'
import { SystemView } from '../../../../../model/system/system.view'
import { CalculationModal } from '../../../../modals/calculation/calculation.modal'
import { NotificationService } from 'src/app/modules/qsa/services/notification.service'
import { NumberService } from 'src/app/modules/qsa/services/number.service'
import { FormulaBackendService } from 'src/app/modules/qsa/services/formula-backend.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'tab-table-component',
    templateUrl: './tab-table.component.html'
})
export class TabTableComponent {
    @Input() systemView: SystemView
    @Input() systemTableView: TableView

    constructor(
        private modalService: NgbModal,
        private notificationService: NotificationService,
        private numberService: NumberService,
        private formulaBackendService: FormulaBackendService,
        private translateService: TranslateService
    ) {}

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
        const systemId = this.systemView.id
        this.formulaBackendService.getDefaultFormula(systemFeatureId, systemId).subscribe(
            () => {
                const modalRef = this.modalService.open(CalculationModal)
                modalRef.componentInstance.systemFeatureId = systemFeatureId
                modalRef.componentInstance.systemId = systemId
                modalRef.componentInstance.result = systemFeatureValue
                modalRef.componentInstance.calculatedFeatures = this.systemTableView.systemOutputs.map(element => ({
                    name: element.id,
                    value: Number.parseFloat(this.numberService.roundValue(element.values[0], 3))
                }))
            },
            () => this.showErrorMessage(this.translateService.instant('noCalculationAvailable'))
        )
    }
}
