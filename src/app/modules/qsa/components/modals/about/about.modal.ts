import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Build} from "../../../model/build/build";
import {Logger} from "../../../services/logger";
import {BackendService} from "../../../services/backend.service";

@Component({
    selector: 'about-modal',
    templateUrl: './about.modal.html'
})
export class AboutModal {

    public build: Build;

    constructor(public activeModal: NgbActiveModal,
                public backendService: BackendService) {
        this.backendService.getBackendInfo().subscribe(response => {
            Logger.i(this, 'Backend info for application version', response);
            if (response) {
                this.build = response['build'];
            }
        });
    }

}
