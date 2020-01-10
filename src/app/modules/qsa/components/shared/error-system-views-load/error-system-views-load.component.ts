import {Component} from '@angular/core';
import {SystemViewService} from '../../../services/system.view.service';

@Component({
    selector: 'error-system-views-load-component',
    templateUrl: './error-system-views-load.component.html'
})
export class ErrorSystemViewsLoadComponent {

    constructor(private systemViewService: SystemViewService) {
    }

    public loadSystemViewsList(): void {
        this.systemViewService.loadSystemViews(true);
    }
}
