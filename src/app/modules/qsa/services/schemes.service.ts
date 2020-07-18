import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Tab } from '../model/tab/tab'

@Injectable()
export class SchemesService {
    private tabsChangedListener = new Subject<Tab[]>()
    private selectedTabChangedListener = new Subject<number>()
    private deletedTabChangedListener = new Subject<number>()
    private currentTab = 0
    private tabs: Tab[] = [new Tab('defaultTab')]

    /* TABS */

    public getOnTabsChangedListener(): Subject<Tab[]> {
        return this.tabsChangedListener
    }

    public getOnChangedListener(): Subject<number> {
        return this.selectedTabChangedListener
    }

    public getTabs(): Tab[] {
        return this.tabs.slice()
    }

    public getSelectedTab(index: number): Tab {
        return this.getTabs()[index]
    }

    public getSelectedTabIndex(): number {
        return this.currentTab
    }

    public addTab(tab: Tab): void {
        this.tabs.push(tab)
        this.tabsChangedListener.next(this.tabs.slice())
    }

    public deleteTab(index: number): void {
        this.tabs.splice(index, 1)
        this.tabsChangedListener.next(this.tabs.slice())
        this.deletedTabChangedListener.next(index)
    }

    public selectedTab(index: number): void {
        this.currentTab = index
        this.selectedTabChangedListener.next(this.currentTab)
    }
}
