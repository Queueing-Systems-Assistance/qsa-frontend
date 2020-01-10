import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'tab-change-modal',
    templateUrl: './tab-change.modal.html'
})
export class TabChangeModal {

    constructor(public activeModal: NgbActiveModal) {
    }
}
