import { Component, Input } from '@angular/core'
import { ClipboardService } from 'ngx-clipboard'
import { TranslateService } from '@ngx-translate/core'
import { NotificationService } from '../../../services/notification.service'
import { Logger } from '../../../services/logger'

@Component({
    selector: 'documentation-url-component',
    templateUrl: './documentation-url.component.html',
})
export class DocumentationUrlComponent {
    @Input() requestType: string
    @Input() requestURL: string

    constructor(
        private clipboardService: ClipboardService,
        private notificationService: NotificationService,
        private translateService: TranslateService
    ) {}

    public copyToClipboardText(text: string): void {
        Logger.i(this, 'Copy text to clipboard', text)
        this.translateService.get('copiedToClipboard').subscribe((value) => {
            this.notificationService.showToastInfo(value)
            this.clipboardService.copyFromContent(text)
        })
    }
}
