import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MathContent } from 'src/app/modules/mathjax/math-content';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.modal.html'
})
export class CalculationModal implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  demoMath: MathContent;

  ngOnInit() {
    this.demoMath = new MathContent();
    this.demoMath.append("$E = mc^2$");
    this.demoMath.append('\n');
    this.demoMath.append('When $a \\ne 0$, there are two solutions to $\\frac{5}{9}$');
  }
}
