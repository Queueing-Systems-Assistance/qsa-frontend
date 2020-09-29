import { Component, OnInit, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Logger } from '../../../services/logger'
import { TablesService } from '../../../services/tables.service'
import { SchemesService } from '../../../services/schemes.service'
import { FormulaBackendService } from '../../../services/formula-backend.service'
import { SystemFeatureInput } from '../../../model/formula/system-feature-input'
import { FinalResult } from '../../../model/formula/final-result'
import { TranslateService } from '@ngx-translate/core'

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
        private tablesService: TablesService,
        private translateService: TranslateService
    ) {}

    @Input() public systemFeatureId: string
    @Input() public systemId: string
    @Input() public result: number

    generalFormula = ''
    calculationSteps: string[] = []
    currentPage = 1
    finalStep = ''

    ngOnInit(): void {
        Logger.i(this, `systemFeatureId: ${this.systemFeatureId}, systemId: ${this.systemId}`)
        this.formulaBackendService.getDefaultFormula(this.systemFeatureId, this.systemId).subscribe(({ data }) => {
            this.generalFormula = data.formulaDefault.value
        })

        const currentTab = this.schemesService.getSelectedTabIndex()
        this.formulaBackendService.getStepsFormula(this.systemFeatureId, this.systemId).subscribe(({ data }) => {
            this.calculationSteps = data.formulaSteps.value || []
            console.log(this.calculationSteps)
        })

        const inputValues = this.tablesService.getSystemInputsForm(currentTab).value
        const inputs: SystemFeatureInput[] = SystemFeatureInput.convertToArray(inputValues)
        this.formulaBackendService.getFinalResult(this.systemFeatureId, this.systemId, inputs).subscribe(({ data }) => {
            const finalResult: FinalResult = data.finalResult as FinalResult
            this.finalStep = this.createFinalStep(finalResult)
        })
    }

    private createFinalStep(finalResult: FinalResult): string {
        try {
            return `${this.translateService.instant('finalResult')}\n${finalResult.defaultFormula} = ${
                finalResult.substitutedFormula
            } = ${this.result}`
        } catch (Exception) {
            return this.translateService.instant('cannotCalculateFinalResult')
        }
    }
}
