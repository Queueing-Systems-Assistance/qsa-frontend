import {Component, Input} from '@angular/core';
import {Tab, TabType} from "../../../model/tab/tab";
import {Logger} from "../../../services/logger";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BackendService} from "../../../services/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SchemesService} from "../../../services/schemes.service";

@Component({
    selector: 'home-selection-component',
    templateUrl: './home.selection.component.html',
    styleUrls: ['./home.selection.component.css']
})
export class HomeSelectionComponent {

    @Input() tabType: TabType;
    @Input() imageSrc: string;
    @Input() altText: string;
    @Input() text: string;

    constructor(private modalService: NgbModal,
                private backendService: BackendService,
                private route: ActivatedRoute,
                private router: Router,
                private schemesService: SchemesService) {
    }

    public navigateToSchemes(tabType: TabType): void {
        let newTab = new Tab('newTab', tabType);
        this.schemesService.addTab(newTab);
        let tabsSize = this.schemesService.getTabs().length;
        this.navigateToTab(tabsSize);
    }

    private navigateToTab(tabsSize) {
        this.schemesService.selectedTab(tabsSize - 1);
        this.router.navigate(['/schemes/' + (tabsSize - 1)], {replaceUrl: true, relativeTo: this.route})
            .then(value => Logger.i(this, 'New tab created from the [HomeComponent], result is [' + value + ']'))
            .catch(reason => Logger.e(this, 'Error occurred while navigating to the new tab on [HomeComponent], reason:', reason));
    }
}
