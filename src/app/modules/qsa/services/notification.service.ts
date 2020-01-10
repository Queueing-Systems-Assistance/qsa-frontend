import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class NotificationService {

    constructor(private toastService: ToastrService) {
    }

    public showToastError(errorMessage: string): void {
        this.toastService.error(errorMessage);
    }

    public showToastInfo(infoMessage: string): void {
        this.toastService.info(infoMessage);
    }
}
