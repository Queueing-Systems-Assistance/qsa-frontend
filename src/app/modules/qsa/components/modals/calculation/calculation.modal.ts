import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.modal.html'
})
export class CalculationModal implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  demoMath: string;

  ngOnInit() {
    this.demoMath = "$E = mc^2$";
    this.demoMath = this.demoMath.concat('\n');
    this.demoMath = this.demoMath.concat('When $a \\ne 0$, there are two solutions to $\\frac{5}{9}$');
  }
}
