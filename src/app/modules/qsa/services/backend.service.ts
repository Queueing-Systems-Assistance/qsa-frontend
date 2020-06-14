import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {ChartData} from '../model/chart/chart.data';
import {TableView} from '../model/table/table.view';
import {Logger} from './logger';
import {SystemFeature} from '../model/system/system.feature';
import {Build} from '../model/build/build';
import {environment} from '../../../../environments/environment';
import {LocaleHelper} from '../helpers/locale.helper';

@Injectable()
export class BackendService {

    private SYSTEM_TABLE_API = environment.apiUrl + '/table';
    private CHART_API = environment.apiUrl + '/chart';
    private INFO_API = environment.apiUrl + '/actuator/info';

    constructor(private translateService: TranslateService,
                private http: HttpClient) {
        Logger.i(this, 'API URL [' + environment.apiUrl + ']');
    }

    public getInput(systemId: string): Observable<Array<SystemFeature>> {
        let params = this.getParams();
        Logger.i(this, 'HTTP GET', 'getInput()', systemId);
        return this.http.get<Array<SystemFeature>>(environment.apiUrl + '/systems/' + systemId, {params});
    }

    public getTable(values, systemId): Observable<TableView> {
        let params = this.getParams();
        Logger.i(this, 'HTTP POST', 'getTable()', values);
        return this.http.post<TableView>(this.SYSTEM_TABLE_API + '/' + systemId, values, {params});
    }

    public getChart(values, systemId, xAxisFeatureId): Observable<ChartData> {
        let params = this.getParams();
        Logger.i(this, 'HTTP POST', 'getChart()', values);
        return this.http.post<ChartData>(this.CHART_API + '/' + systemId + '/' + xAxisFeatureId, values, {params});
    }

    public getBackendInfo(): Observable<Build> {
        Logger.i(this, 'HTTP GET', 'getBackendInfo()');
        return this.http.get<Build>(this.INFO_API);
    }

    private getParams(): HttpParams {
        return new HttpParams().set('locale', LocaleHelper.getCorrectLocale(this.translateService));
    }
}
