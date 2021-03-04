import { Component, Input } from '@angular/core'
import { TableView } from '../../../../../model/table/table.view'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ExportCsvModal } from '../../../../modals/export-csv/export-csv.modal'
import { SystemView } from '../../../../../model/system/system.view'
import { CalculationModal } from '../../../../modals/calculation/calculation.modal'
import { NotificationService } from 'src/app/modules/qsa/services/notification.service'
import { NumberService } from 'src/app/modules/qsa/services/number.service'
import { TranslateService } from '@ngx-translate/core'
import { BackendService, FormulaType } from 'src/app/modules/qsa/services/backend.service'
import { TabDetailComponent } from '../tab-detail/tab-detail.component'
import { SystemFeature } from '../../../../../model/system/system.feature'

@Component({
    selector: 'tab-table-component',
    templateUrl: './tab-table.component.html'
})
export class TabTableComponent {
    @Input() systemView: SystemView
    @Input() systemTableView: TableView
    @Input() systemInputs: any
    @Input() systemViewInputs: SystemFeature[]

    constructor(
        private modalService: NgbModal,
        private notificationService: NotificationService,
        private numberService: NumberService,
        private backendService: BackendService,
        private translateService: TranslateService,
        private tabDetailComponent: TabDetailComponent
    ) {}

    public exportToCSV(): void {
        const modalRef = this.modalService.open(ExportCsvModal)
        modalRef.componentInstance.systemTableView = this.systemTableView
        modalRef.componentInstance.systemView = this.systemView
        modalRef.componentInstance.systemInputs = this.systemInputs
        modalRef.componentInstance.systemViewInputs = this.systemViewInputs
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

    public showCalculationModal(featureId: string, featureValue: string): void {
        const systemId = this.systemView.id
        const inputFeatures = this.tabDetailComponent.getSystemInputForm().value
        this.backendService.getFormula(inputFeatures, systemId, featureId, FormulaType.DEFAULT).subscribe(
            () => {
                const modalRef = this.modalService.open(CalculationModal)
                modalRef.componentInstance.featureId = featureId
                modalRef.componentInstance.systemId = systemId
                modalRef.componentInstance.result = featureValue
                modalRef.componentInstance.inputFeatures = inputFeatures
            },
            () => this.showErrorMessage(this.translateService.instant('noCalculationAvailable'))
        )
    }
}
