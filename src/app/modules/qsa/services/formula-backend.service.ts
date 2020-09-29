import { Injectable } from '@angular/core'
import { ConfigConditionInput } from '../model/formula/config-condition-input'
import { Logger } from './logger'
import { LocaleHelper } from '../helpers/locale.helper'
import { TranslateService } from '@ngx-translate/core'
import { HttpClient } from '@angular/common/http'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { SystemFeatureInput } from '../model/formula/system-feature-input'
import { ApolloQueryResult } from 'apollo-client'

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

const finalResultQuery = gql`
    query finalResult($name: String!, $inputs: [SystemFeatureInput!]!, $conditions: [ConfigConditionInput!]!) {
        finalResult(name: $name, inputs: $inputs, conditions: $conditions) {
            defaultFormula
            substitutedFormula
        }
    }
`

@Injectable()
export class FormulaBackendService {
    constructor(private translateService: TranslateService, private http: HttpClient, private apollo: Apollo) {}
    private assembleConfigConditions(system: string, locale: string): ConfigConditionInput[] {
        const conditions: ConfigConditionInput[] = []
        conditions.push({ name: 'system', value: system })
        conditions.push({ name: 'locale', value: locale })
        return conditions
    }

    public getDefaultFormula(name: string, system: string): Observable<ApolloQueryResult<any>> {
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

    public getStepsFormula(name: string, system: string): Observable<ApolloQueryResult<any>> {
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

    public getFinalResult(
        name: string,
        system: string,
        inputs: SystemFeatureInput[]
    ): Observable<ApolloQueryResult<any>> {
        Logger.i(this, 'GraphQL', 'formulaSteps')
        const locale = this.getCurrentLocale()
        const conditions: ConfigConditionInput[] = this.assembleConfigConditions(system, locale)
        return this.apollo.query({
            query: finalResultQuery,
            variables: {
                name: name,
                inputs: inputs,
                conditions: conditions
            }
        })
    }

    public getCurrentLocale(): string {
        return LocaleHelper.getCorrectLocale(this.translateService)
    }
}
