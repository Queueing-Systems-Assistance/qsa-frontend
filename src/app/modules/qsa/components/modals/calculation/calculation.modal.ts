import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.modal.html'
})
export class CalculationModal implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  generalFormula: string;
  
  calculationSteps: string[];
  currentPage: number = 1;

  ngOnInit() {
    this.generalFormula = "$E = mc^2$";

    this.calculationSteps = ['When $a \\ne 0$,', 'there are two solutions to $\\frac{5}{9}$'];
  }
}
