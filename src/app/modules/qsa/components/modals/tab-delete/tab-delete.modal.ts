import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'tab-delete-modal',
    templateUrl: './tab-delete.modal.html'
})
export class TabDeleteModal {

    constructor(public activeModal: NgbActiveModal) {
    }
}
