import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class NotificationService {

    constructor(private toastService: ToastrService) {
    }

    public showToastError(error: any[]): void {
        error.forEach(errorMessageElem => {
            this.toastService.error(errorMessageElem.errorMessage);
        })
    }

    public showToastInfo(infoMessage: string): void {
        this.toastService.info(infoMessage);
    }
}
