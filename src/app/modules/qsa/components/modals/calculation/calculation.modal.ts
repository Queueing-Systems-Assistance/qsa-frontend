import { Component, OnInit, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { BackendService } from '../../../services/backend.service'
import { Logger } from '../../../services/logger'

@Component({
    selector: 'app-calculation',
    templateUrl: './calculation.modal.html'
})
export class CalculationModal implements OnInit {
    constructor(public activeModal: NgbActiveModal, private backendService: BackendService) {}

    @Input() public systemFeatureId: string
    @Input() public systemId: string

    generalFormula: string

    calculationSteps: string[]
    currentPage = 1

    ngOnInit(): void {
        Logger.i(this, `systemFeatureId: ${this.systemFeatureId}, systemId: ${this.systemId}`)

        this.backendService.getDefaultFormula(this.systemFeatureId, this.systemId).subscribe((res) => {
            this.generalFormula = res.data.formulaDefault.value
        })

        this.calculationSteps = ['When $a \\ne 0$,', 'there are two solutions to $\\frac{5}{9}$']
    }
}
