import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { SchemesService } from '../../../services/schemes.service'
import { Logger } from '../../../services/logger'
import { TabType } from '../../../model/tab/tab'

@Component({
    selector: 'schemes-container-component',
    templateUrl: './schemes.container.component.html'
})
export class SchemesContainerComponent implements OnInit, OnDestroy {
    public TabType = TabType
    private selectedTab: number
    private subscription: Subscription

    constructor(private schemesService: SchemesService) {
        this.selectedTab = this.schemesService.getSelectedTabIndex()
    }

    public ngOnInit(): void {
        this.subscription = this.schemesService.getOnChangedListener().subscribe((currentTab: number) => {
            Logger.i(this, 'Changed selected tab on [SchemesContainerComponent] into [' + currentTab + ']')
            return (this.selectedTab = currentTab)
        })
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    public isCurrentTabIs(tabType: TabType): boolean {
        return this.schemesService.getTabs()[this.selectedTab].type === tabType
    }
}
