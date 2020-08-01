import { Injectable } from '@angular/core'
import { SystemView } from '../model/system/system.view'
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Logger } from './logger'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { ParamsHelper } from '../helpers/params.helper'

@Injectable()
export class SystemViewService {
    private static SYSTEMS_API = environment.apiUrl + '/systems'

    private systemViews = new Array<SystemView>()

    constructor(private http: HttpClient, private translateService: TranslateService) {}

    public loadSystemViews(force: boolean) {
        if (!this.isSystemViewsLoaded() || force) {
            Logger.i(this, 'Loading system list')
            this.getSystemsViewsAsync().subscribe(value => (this.systemViews = value))
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

    public getSystemsViewsAsync(): Observable<Array<SystemView>> {
        const params = ParamsHelper.getParams(this.translateService)
        Logger.i(this, 'HTTP GET', 'getSystemsViews()', '')
        return this.http.get<Array<SystemView>>(SystemViewService.SYSTEMS_API, { params })
    }
}
