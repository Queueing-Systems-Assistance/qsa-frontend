import { Injectable } from '@angular/core'
import { SystemView } from '../model/system/system.view'
import { HttpClient } from '@angular/common/http'
import { Logger } from './logger'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { ApolloQueryResult } from 'apollo-client'
import { LocaleHelper } from '../helpers/locale.helper'
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'

const systemViewsQuery = gql`
    query {
        systemElements {
            id
            name
            status
            description
        }
    }
`

@Injectable()
export class SystemViewService {

    private systemViews = new Array<SystemView>()

    constructor(private http: HttpClient, private translateService: TranslateService, private apollo: Apollo) {}

    public loadSystemViews(force: boolean) {
        if (!this.isSystemViewsLoaded() || force) {
            Logger.i(this, 'Loading system list')
            this.getSystemsViewsAsync().subscribe(value => (this.systemViews = value.data.systemElements))
        }
    }

    public getSystemViewById(id: string): SystemView {
        let result = null
        this.getSystemViews().forEach(systemView => {
            if (systemView.id == id) {
                result = systemView
            }
        })
        return result
    }

    public getSystemViews(): SystemView[] {
        return this.systemViews
    }

    /* SYSTEM VIEWS */

    public isSystemViewsLoaded(): boolean {
        return Boolean(this.getSystemViews().length)
    }

    public getSystemsViewsAsync(): Observable<ApolloQueryResult<any>> {
        Logger.i(this, 'GraphQL', 'SystemView')
        return this.apollo.query({
            query: systemViewsQuery,
            context: {
                headers: {
                    'Accept-Language': this.getCurrentLocale(),
                    'Content-Type': 'application/json'
                }
            }
        })
    }

    public getCurrentLocale(): string {
        const correctLocale = LocaleHelper.getCorrectLocale(this.translateService)
        return correctLocale + '_' + correctLocale.toUpperCase()
    }
}
