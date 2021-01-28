import { NgModule } from '@angular/core'
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { environment } from '../../../environments/environment'
import { onError } from 'apollo-link-error'
import { ToastrService } from 'ngx-toastr'
import { GraphQLError } from 'graphql'
import { TranslateService } from '@ngx-translate/core'

const uri = environment.apiUrl

function filterErrors(graphQLErrors: ReadonlyArray<GraphQLError>) {
    return graphQLErrors
        .filter(err => err.extensions)
        .map(err => err.extensions)
        .flatMap(ext =>
            Object.keys(ext)
                .map(key => ext[key][0])
                .slice()
        )
}

export function createApollo(httpLink: HttpLink, toastService: ToastrService, translateService: TranslateService) {
    return {
        link: onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                new Set(filterErrors(graphQLErrors)).forEach(errorMessage => toastService.error(errorMessage as string))
            }
            if (networkError) {
                translateService
                    .get('errorOccurred')
                    .subscribe(translations => this.notificationService.showToastError(translations))
            }
        }).concat(httpLink.create({ uri })),
        cache: new InMemoryCache()
    }
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink, ToastrService, TranslateService]
        }
    ]
})
export class GraphQLModule {}
