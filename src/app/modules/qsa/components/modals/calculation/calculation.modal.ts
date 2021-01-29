import { Component, OnInit, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Logger } from '../../../services/logger'
import { TranslateService } from '@ngx-translate/core'
import { NumberService } from '../../../services/number.service'
import { BackendService, FormulaType } from '../../../services/backend.service'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

const LINEBREAK = '\n'
const EQUALS = ' = '

@Component({
    selector: 'app-calculation',
    templateUrl: './calculation.modal.html',
    styleUrls: ['./calculation-modal.scss']
})
export class CalculationModal implements OnInit {
    constructor(
        public activeModal: NgbActiveModal,
        private translateService: TranslateService,
        private numberService: NumberService,
        private backendService: BackendService
    ) {}

    @Input() public featureId: string
    @Input() public systemId: string
    @Input() public result: string
    @Input() public inputFeatures: any

    generalFormula = ''
    calculationSteps: string[] = []
    currentPage = 1
    finalStep = ''

    ngOnInit(): void {
        Logger.i(this, `featureId: ${this.featureId}, systemId: ${this.systemId}`)
        this.getFormula(FormulaType.DEFAULT).subscribe(formula => this.generalFormula = formula)
        this.getFormula(FormulaType.STEPS).subscribe(
            formula => this.calculationSteps = formula.split("<br>"),
            () => this.calculationSteps = []
        )
        if (this.isResultValid()) {
            this.getFormula(FormulaType.CALCULATED).subscribe(
                formula => this.finalStep = this.createFinalStep(formula),
                () => this.finalStep = this.createFinalError()
            )
        } else {
            this.finalStep = this.createFinalError()
        }
    }

    private createFinalStep(calculatedFormula: string): string {
        try {
            return (
                this.translateService.instant('finalResult') +
                LINEBREAK +
                this.generalFormula +
                EQUALS +
                calculatedFormula +
                EQUALS +
                this.numberService.getSimplestForm(this.result)
            )
        } catch (Exception) {
            return this.translateService.instant('cannotCalculateFinalResult')
        }
    }

    private createFinalError(): string {
        return (
            this.translateService.instant('cannotCalculateFinalResult') +
            LINEBREAK +
            this.translateService.instant('errorOccured')
        )
    }

    private isResultValid(): boolean {
        return this.numberService.isNumber(this.result)
    }

    private getFormula(type: FormulaType): Observable<string> {
        return this.backendService.getFormula(this.inputFeatures, this.systemId, this.featureId, type)
            .pipe(map(data => data.data.systemElements[0].formula))
    }
}
