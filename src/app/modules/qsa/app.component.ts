import {Component, OnInit} from '@angular/core';
import {CookieConsentService} from './services/cookie.consent.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocaleHelper} from './helpers/locale.helper';
import {SystemViewService} from './services/system.view.service';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private cookieConsentService: CookieConsentService,
                private router: Router,
                private translateService: TranslateService,
                private systemViewService: SystemViewService) {
        setTimeout(() => cookieConsentService.showNotificationIfNeeded(), 2000);
    }

    public ngOnInit(): void {
        this.setLocale();
    }

    private setLocale(): void {
        let compatibleLanguage = LocaleHelper.getCorrectLocale(this.translateService);
        this.translateService.setDefaultLang(compatibleLanguage);
        this.systemViewService.loadSystemViews(true);
    }
}
