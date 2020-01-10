import {Component, OnInit} from '@angular/core';
import {Logger} from '../../../../services/logger';
import {SchemesService} from '../../../../services/schemes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TabType} from '../../../../model/tab/tab';

@Component({
    selector: 'schemes-default-component',
    templateUrl: './schemes.default.component.html'
})
export class SchemesDefaultComponent implements OnInit {

    public TabType = TabType;
    private currentTab: number;

    constructor(private schemesService: SchemesService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.currentTab = +params['id']);
    }

    public schemeSelect(tabType: TabType): void {
        Logger.i(this, 'Scheme changed to [' + tabType + ']');
        this.schemesService.getTabs()[this.currentTab].type = tabType;
    }
}
