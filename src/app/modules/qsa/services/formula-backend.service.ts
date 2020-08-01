import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { ConfigConditionInput } from '../model/formula/config-condition-input'
import { Observable } from 'rxjs'
import { Logger } from './logger'
import { LocaleHelper } from '../helpers/locale.helper'
import { TranslateService } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class FormulaBackendService {
    constructor(private translateService: TranslateService, private http: HttpClient) {}

    private FORMULA_API = environment.formulaApiUrl + '/graphql'

    private assembleConfigConditions(system: string, locale: string): ConfigConditionInput[] {
        const conditions: ConfigConditionInput[] = []
        conditions.push({ name: 'system', value: system })
        conditions.push({ name: 'locale', value: locale })
        return conditions
    }

    private buildFormulaQuery(name: string, conditions: ConfigConditionInput[]): string {
        const queryBuilder: string[] = [`name:"${name}",[`]
        conditions.forEach((condition, index) => {
            queryBuilder.push(`{name:"${condition.name}",value:"${condition.value}"}`)
            if (index < conditions.length - 1) {
                queryBuilder.push(',')
            }
        })
        queryBuilder.push(']')
        return queryBuilder.join('')
    }

    public getDefaultFormula(name: string, system: string): Observable<any> {
        Logger.i(this, 'HTTP POST', 'getDefaultFormula()')
        const locale: string = LocaleHelper.getCorrectLocale(this.translateService)
        const conditions: ConfigConditionInput[] = this.assembleConfigConditions(system, locale)
        const queryParams = this.buildFormulaQuery(name, conditions)
        const queryString = `query{formulaDefault(${queryParams}){value}}`
        console.log(queryString)
        return this.http.post(this.FORMULA_API, { query: queryString })
    }

    public getStepsFormula(name: string, system: string): Observable<any> {
        const locale: string = LocaleHelper.getCorrectLocale(this.translateService)
        Logger.i(this, 'HTTP GET', 'getStepsFormula()')
        const queryString = `${this.FORMULA_API}?query={formulaSteps(name:"${name}",system:"${system}",locale:"${locale}"){value}}`
        return this.http.get(queryString)
    }
}
