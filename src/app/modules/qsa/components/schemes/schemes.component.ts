import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SchemesService} from '../../services/schemes.service';


@Component({
    selector: 'schemes-component',
    templateUrl: './schemes.component.html'
})
export class SchemesComponent implements OnInit, OnDestroy {

    private selectedTab: number;
    private subscription: Subscription;

    constructor(private schemesService: SchemesService,
                private router: Router,
                private route: ActivatedRoute) {
        this.subscription = this.schemesService.getOnChangedListener().subscribe((currentTab: number) => this.selectedTab = currentTab);
        this.selectedTab = this.schemesService.getSelectedTabIndex();
    }

    public ngOnInit(): void {
        this.router.navigate([this.selectedTab], {relativeTo: this.route});
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
