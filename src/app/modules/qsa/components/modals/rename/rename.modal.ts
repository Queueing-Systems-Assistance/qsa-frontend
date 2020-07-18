import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'tab-rename-modal',
    templateUrl: './rename.modal.html'
})
export class RenameModal {
    public formControl = new FormControl()

    constructor(public activeModal: NgbActiveModal) {}
}
