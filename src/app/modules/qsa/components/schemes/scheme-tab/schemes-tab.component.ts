import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Tab } from '../../../model/tab/tab'
import { SchemesService } from '../../../services/schemes.service'
import { Logger } from '../../../services/logger'

@Component({
    selector: 'schemes-tab-component',
    templateUrl: './schemes-tab.component.html'
})
export class SchemesTabComponent implements OnInit, OnDestroy {
    private tabs: Tab[]
    private subscription: Subscription

    constructor(private schemesService: SchemesService, private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.subscription = this.schemesService
            .getOnTabsChangedListener()
            .subscribe((tabs: Tab[]) => (this.tabs = tabs))
        this.tabs = this.schemesService.getTabs()
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    public getTabs(): Tab[] {
        return this.tabs
    }

    public onNewTab(): void {
        const newTab = new Tab('newTab')
        this.schemesService.addTab(newTab)
        this.schemesService.getOnChangedListener().next(this.tabs.length - 1)
        this.router
            .navigate([this.tabs.length - 1], { relativeTo: this.route })
            .then((value) =>
                Logger.i(this, 'New tab created from the [SchemesTabComponent], result is [' + value + ']')
            )
            .catch((reason) =>
                Logger.e(
                    this,
                    'Error occurred while navigating to the new tab on [SchemesTabComponent], reason:',
                    reason
                )
            )
    }
}
