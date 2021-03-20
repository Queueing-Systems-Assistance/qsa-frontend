declare let require: any

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgSelectModule } from '@ng-select/ng-select'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HighchartsChartModule } from 'highcharts-angular'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { AppComponent } from './app.component'
import { ChartDetailComponent } from './components/schemes/schemes-container/charts/chart-detail/chart-detail.component'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { HomeComponent } from './components/home/home.component'
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor'
import { AboutModal } from './components/modals/about/about.modal'
import { RenameModal } from './components/modals/rename/rename.modal'
import { BackendService } from './services/backend.service'
import { ChartsService } from './services/charts.service'
import { NotificationService } from './services/notification.service'
import { TablesService } from './services/tables.service'
import { TabDetailComponent } from './components/schemes/schemes-container/tables/tab-detail/tab-detail.component'
import { SystemViewService } from './services/system.view.service'
import { CookieService } from 'ngx-cookie-service'
import { CookieConsentService } from './services/cookie.consent.service'
import { NgxJsonViewerModule } from 'ngx-json-viewer'
import { ClipboardModule } from 'ngx-clipboard'
import { NumberDirective } from './directives/number.directive'
import { SystemInputComponent } from './components/shared/system-input/system-input.component'
import { SystemSelectionComponent } from './components/shared/system-selection/system-selection.component'
import { ErrorSystemViewsLoadComponent } from './components/shared/error-system-views-load/error-system-views-load.component'
import { EmptySystemViewsComponent } from './components/shared/empty-system-views/empty-system-views.component'
import { SystemInputDropDownComponent } from './components/shared/system-input-drop-down/system-input-drop-down.component'
import { TabTableComponent } from './components/schemes/schemes-container/tables/tab-table/tab-table.component'
import { JsonCardComponent } from './components/shared/json-card/json-card.component'
import { DocumentationTableComponent } from './components/shared/documentation-table/documentation-table.component'
import { ChartFigureComponent } from './components/schemes/schemes-container/charts/chart-figure/chart-figure.component'
import { ExportCsvModal } from './components/modals/export-csv/export-csv.modal'
import { SchemesComponent } from './components/schemes/schemes.component'
import { SchemesService } from './services/schemes.service'
import { SchemesTabComponent } from './components/schemes/scheme-tab/schemes-tab.component'
import { SchemesDefaultComponent } from './components/schemes/schemes-container/default/schemes.default.component'
import { SchemeTabItem } from './components/schemes/scheme-tab-item/scheme-tab-item.component'
import { SchemesContainerComponent } from './components/schemes/schemes-container/schemes.container.component'
import { TabChangeModal } from './components/modals/tab-change/tab-change.modal'
import { TabDeleteModal } from './components/modals/tab-delete/tab-delete.modal'
import { CompareTableDetailComponent } from './components/schemes/schemes-container/tables-compare/compare-detail/compare-table-detail.component'
import { TablesCompareService } from './services/tables-compare.service'
import { CompareTableSelectionComponent } from './components/schemes/schemes-container/tables-compare/compare-table-selection/compare-table-selection.component'
import { CompareTableComponent } from './components/schemes/schemes-container/tables-compare/compare-table/compare-table.component'
import { HomeSelectionComponent } from './components/home/selection/home.selection.component'
import { HomeKendallComponent } from './components/home/kendall/home.kendall.component'
import { HomeSystemsComponent } from './components/home/systems/home.systems.component'
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar'
import * as Highcharts from 'highcharts/highstock'
import { MathjaxModule } from '../mathjax/mathjax.module'
import { CalculationModal } from './components/modals/calculation/calculation.modal'
import { GraphQLModule } from '../graphql/graphql.module'
import { NumberService } from './services/number.service'
import { LogoComponent } from './components/home/logo/logo.component'

require('highcharts/modules/exporting')(Highcharts)

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'schemes',
        component: SchemesComponent,
        children: [
            { path: '', component: SchemesComponent },
            { path: ':id', component: SchemesContainerComponent }
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
    declarations: [
        // Page
        HeaderComponent,
        AppComponent,
        FooterComponent,
        // Home section
        HomeComponent,
        HomeSelectionComponent,
        HomeKendallComponent,
        HomeSystemsComponent,
        // Schemes section
        SchemesComponent,
        SchemesContainerComponent,
        SchemesTabComponent,
        SchemeTabItem,
        SchemesDefaultComponent,
        // Tables section
        TabDetailComponent,
        TabTableComponent,
        // Chart section
        ChartDetailComponent,
        ChartFigureComponent,
        // Compare Tables section
        CompareTableDetailComponent,
        CompareTableSelectionComponent,
        CompareTableComponent,
        // Modals
        AboutModal,
        RenameModal,
        ExportCsvModal,
        TabDeleteModal,
        TabChangeModal,
        // Directives
        NumberDirective,
        // Shared
        SystemInputComponent,
        SystemSelectionComponent,
        SystemInputDropDownComponent,
        EmptySystemViewsComponent,
        ErrorSystemViewsLoadComponent,
        JsonCardComponent,
        DocumentationTableComponent,
        CalculationModal,
        LogoComponent
    ],
    imports: [
        GraphQLModule,
        MalihuScrollbarModule.forRoot(),
        HighchartsChartModule,
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgSelectModule,
        NgxJsonViewerModule,
        ClipboardModule,
        MathjaxModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        // Services
        SchemesService,
        BackendService,
        TablesService,
        ChartsService,
        TablesCompareService,
        SystemViewService,
        NotificationService,
        CookieService,
        CookieConsentService,
        NumberService,
        // Interceptors
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    entryComponents: [AboutModal, RenameModal, ExportCsvModal, TabDeleteModal, TabChangeModal, CalculationModal]
})
export class QsaModule {
    constructor(private toastr: ToastrService) {
        const globalConfig = toastr.toastrConfig
        globalConfig.enableHtml = true
        globalConfig.positionClass = 'toast-bottom-right'
        globalConfig.maxOpened = 5
    }
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}
