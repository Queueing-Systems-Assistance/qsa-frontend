import {Component, OnInit} from '@angular/core';
import {SystemView} from '../../../model/system/system.view';
import {Status} from '../../../model/system/status';
import {SystemViewService} from '../../../services/system.view.service';

@Component({
    selector: 'home-systems-component',
    templateUrl: './home.systems.component.html',
    styleUrls: ['./home.systems.component.css']
})
export class HomeSystemsComponent implements OnInit{

    public systemViews = new Array<SystemView>();

    public scrollbarOptions: MCustomScrollbar.CustomScrollbarOptions = {
        axis: 'x',
        theme: 'dark-thick',
        contentTouchScroll: 25,
        documentTouchScroll: true,
        scrollButtons: {
            'enable': true
        }
    };

    constructor(private systemViewService: SystemViewService) {
    }

    public ngOnInit(): void {
        this.systemViews = this.getSystems();
    }

    public isSystemsLoaded(): boolean {
        return this.systemViewService.isSystemViewsLoaded();
    }

    public isSystemStatusBeta(status: Status): boolean {
        return status === Status.BETA;
    }

    public getSystems(): SystemView[] {
        return this.systemViewService.getSystemViews();
    }
}
