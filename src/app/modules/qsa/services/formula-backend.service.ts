import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { ConfigConditionInput } from '../model/formula/config-condition-input'
import { Logger } from './logger'
import { LocaleHelper } from '../helpers/locale.helper'
import { TranslateService } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'

const formulaDefaultQuery = gql`
    query formulaDefault($name: String!, $conditions: [ConfigConditionInput!]!) {
        formulaDefault(name: $name, conditions: $conditions) {
            value
        }
    }
`

const formulaStepsQuery = gql`
    query formulaDefault($name: String!, $conditions: [ConfigConditionInput!]!) {
        formulaSteps(name: $name, conditions: $conditions) {
            value
        }
    }
`

@Injectable()
export class FormulaBackendService {
    constructor(private translateService: TranslateService, private http: HttpClient, private apollo: Apollo) {}

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
        Logger.i(this, 'GraphQL', 'formulaDefault')
        const locale = this.getCurrentLocale()
        const conditions: ConfigConditionInput[] = this.assembleConfigConditions(system, locale)
        return this.apollo.query({
            query: formulaDefaultQuery,
            variables: {
                name: name,
                conditions: conditions
            }
        })
    }

    public getStepsFormula(name: string, system: string): Observable<any> {
        Logger.i(this, 'GraphQL', 'formulaSteps')
        const locale = this.getCurrentLocale()
        const conditions: ConfigConditionInput[] = this.assembleConfigConditions(system, locale)
        return this.apollo.query({
            query: formulaStepsQuery,
            variables: {
                name: name,
                conditions: conditions
            }
        })
    }

    public getCurrentLocale(): string {
        return LocaleHelper.getCorrectLocale(this.translateService)
    }
}
