import { Component, OnInit, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Logger } from '../../../services/logger'
import { TablesService } from '../../../services/tables.service'
import { SchemesService } from '../../../services/schemes.service'
import { FormulaBackendService } from '../../../services/formula-backend.service'

@Component({
    selector: 'app-calculation',
    templateUrl: './calculation.modal.html',
    styleUrls: ['./calculation-modal.scss']
})
export class CalculationModal implements OnInit {
    constructor(
        public activeModal: NgbActiveModal,
        private formulaBackendService: FormulaBackendService,
        private schemesService: SchemesService,
        private tablesService: TablesService
    ) {}

    @Input() public systemFeatureId: string
    @Input() public systemId: string

    generalFormula: string

    calculationSteps: string[] = ['Coming soon...']
    currentPage = 1

    ngOnInit(): void {
        Logger.i(this, `systemFeatureId: ${this.systemFeatureId}, systemId: ${this.systemId}`)
        this.formulaBackendService.getDefaultFormula(this.systemFeatureId, this.systemId).subscribe(({ data }) => {
            this.generalFormula = data.formulaDefault.value
        })

        const currentTab = this.schemesService.getSelectedTabIndex()
        const inputValues = this.tablesService.getSystemInputsForm(currentTab).value
        this.formulaBackendService.getStepsFormula(this.systemFeatureId, this.systemId).subscribe(({ data }) => {
            this.calculationSteps = data.formulaSteps.value
        })
    }
}
