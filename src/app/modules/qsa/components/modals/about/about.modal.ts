import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Build } from '../../../model/build/build'

@Component({
    selector: 'about-modal',
    templateUrl: './about.modal.html'
})
export class AboutModal {
    public build: Build

    constructor(public activeModal: NgbActiveModal) {}
}
