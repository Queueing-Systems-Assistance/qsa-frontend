import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { Logger } from './logger'
import { environment } from '../../../../environments/environment'
import { LocaleHelper } from '../helpers/locale.helper'
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'
import { ApolloQueryResult } from 'apollo-client'
import { FeatureCondition } from '../model/system/feature.condition'
import { StreamOutput } from '../model/system/stream-output'

const systemInputsQuery = gql`
    query systemElements($systemIds: [String!]!) {
        systemElements(systemIds: $systemIds) {
            inputs {
                id
                description
                name
                typeFraction
                required
            }
        }
    }
`
const tableQuery = gql`
    query table($systemIds: [String!]!, $inputFeatureConditions: [FeatureCondition!]!) {
        systemElements(systemIds: $systemIds) {
            outputs(inputFeatureConditions: $inputFeatureConditions) {
                id
                name
                values
                description
            }
        }
    }
`

const chartQuery = gql`
    query chart($systemIds: [String!]!, $inputFeatureConditions: [FeatureCondition!]!, $requestedOutputFeatureIds: [String!], $stream: StreamOutput!) {
        systemElements(systemIds: $systemIds) {
            name
            outputsStream(inputFeatureConditions: $inputFeatureConditions, requestedOutputFeatureIds: $requestedOutputFeatureIds, stream: $stream) {
                outputFeatures {
                    id
                    name
                    values
                    description
                }
                stream
            }
        }
    }
`

const formulaQuery = gql`
    query formula($systemIds: [String!]!, $inputFeatureConditions: [FeatureCondition!]!, $featureId: String!, $formulaType: FormulaType!) {
        systemElements(systemIds: $systemIds) {
            formula(featureId: $featureId, inputFeatureConditions: $inputFeatureConditions, formulaType: $formulaType)
        }
    }
`

export enum FormulaType {
    DEFAULT = "DEFAULT",
    STEPS = "STEPS",
    CALCULATED = "CALCULATED"
}

@Injectable()
export class BackendService {

    constructor(private translateService: TranslateService, private http: HttpClient, private apollo: Apollo) {
        Logger.i(this, 'API URL [' + environment.apiUrl + ']')
    }

    public getInput(systemId: string): Observable<ApolloQueryResult<any>> {
        Logger.i(this, 'GraphQL', 'SystemInputs')
        return this.apollo.query({
            query: systemInputsQuery,
            variables: {
                systemIds: [systemId]
            },
            context: {
                headers: {
                    'Accept-Language': this.getCurrentLocale(),
                    'Content-Type': 'application/json'
                }
            }
        })
    }

    public getTable(values: [any], systemId: string): Observable<ApolloQueryResult<any>> {
        Logger.i(this, 'GraphQL', 'Table')
        return this.apollo.query({
            query: tableQuery,
            variables: {
                systemIds: [systemId],
                inputFeatureConditions: this.assembleFeatureConditions(values)
            },
            context: {
                headers: {
                    'Accept-Language': this.getCurrentLocale(),
                    'Content-Type': 'application/json'
                }
            }
        })
    }

    public getChart(values, systemId, xAxisFeatureId): Observable<ApolloQueryResult<any>> {
        Logger.i(this, 'GraphQL', 'Chart')
        const stream = {
            from: values.xAxis.from ? values.xAxis.from : 0,
            to: values.xAxis.to ? values.xAxis.to : 0,
            steps: values.xAxis.steps ? values.xAxis.steps : 0,
            featureId: xAxisFeatureId
        } as StreamOutput
        return this.apollo.query({
            query: chartQuery,
            variables: {
                systemIds: [systemId],
                inputFeatureConditions: this.assembleFeatureConditions(values.features),
                requestedOutputFeatureIds: [],
                stream: stream
            },
            context: {
                headers: {
                    'Accept-Language': this.getCurrentLocale(),
                    'Content-Type': 'application/json'
                }
            }
        })
    }

    public getFormula(values: [any], systemId: string, featureId: string, formulaType: string): Observable<ApolloQueryResult<any>> {
        Logger.i(this, 'GraphQL', 'Formula')
        return this.apollo.query({
            query: formulaQuery,
            variables: {
                systemIds: [systemId],
                inputFeatureConditions: this.assembleFeatureConditions(values),
                featureId: featureId,
                formulaType: formulaType
            },
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

    private assembleFeatureConditions(conditions): [FeatureCondition] {
        return Object.keys(conditions).map(id => {
            const value = conditions[id] ? conditions[id] : 0
            return { id: id, value: value }
        }) as [FeatureCondition]
    }
}
