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
            outputs(inputFeatueConditions: $inputFeatureConditions) {
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
                inputFeatureConditions: Object.keys(values).map(id => {
                    return { id: id, value: values[id] }
                }) as [FeatureCondition]
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
            from: values.xAxis.from,
            to: values.xAxis.to,
            steps: values.xAxis.steps,
            featureId: xAxisFeatureId
        } as StreamOutput
        return this.apollo.query({
            query: chartQuery,
            variables: {
                systemIds: [systemId],
                inputFeatureConditions: Object.keys(values.features).map(id => {
                    return { id: id, value: values.features[id] }
                }) as [FeatureCondition],
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

    public getCurrentLocale(): string {
        const correctLocale = LocaleHelper.getCorrectLocale(this.translateService)
        return correctLocale + '_' + correctLocale.toUpperCase()
    }
}
