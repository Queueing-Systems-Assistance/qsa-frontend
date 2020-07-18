import { ToastrService } from 'ngx-toastr'
import { CookieService } from 'ngx-cookie-service'
import { Injectable } from '@angular/core'
import { Logger } from './logger'
import { TranslateService } from '@ngx-translate/core'

@Injectable()
export class CookieConsentService {
    constructor(
        private toastService: ToastrService,
        private cookieService: CookieService,
        private translateService: TranslateService
    ) {}

    public showNotificationIfNeeded(): void {
        const isCookieConsentOld = this.cookieService.check('cookieConsent')
        Logger.i(this, 'Cookie consent status', true)
        if (!isCookieConsentOld) {
            this.translateService.get('cookieConsentText').subscribe((text) => this.showNotification(text))
        }
    }

    private showNotification(text): void {
        this.toastService
            .info(text, null, {
                timeOut: 0,
                enableHtml: true,
                closeButton: true,
                tapToDismiss: true
            })
            .onHidden.subscribe(() => {
                Logger.i(this, 'Cookie consent status setting to', true)
                this.cookieService.set('cookieConsent', 'true')
            })
    }
}
