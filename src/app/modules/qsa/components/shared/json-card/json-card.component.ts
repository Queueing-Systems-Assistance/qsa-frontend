import { Component, Input } from '@angular/core'
import { Logger } from '../../../services/logger'
import { ClipboardService } from 'ngx-clipboard'
import { NotificationService } from '../../../services/notification.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'json-view-component',
    templateUrl: './json-card.component.html',
})
export class JsonCardComponent {
    @Input() loadedExamples: Map<string, string>
    @Input() example: string
    @Input() cardTitle: string

    constructor(
        private clipboardService: ClipboardService,
        private notificationService: NotificationService,
        private translateService: TranslateService
    ) {}

    public readExampleData(fileName: string): string {
        if (this.loadedExamples.has(fileName)) {
            return this.loadedExamples.get(fileName)
        }
    }

    public openExample(fileName: string): void {
        window.open(location.origin + '/' + fileName)
    }

    public copyToClipboard(fileName: string): void {
        const data = JSON.stringify(this.readExampleData(fileName), null, 2)
        Logger.i(this, 'Copy text to clipboard', data)
        this.translateService.get('copiedToClipboard').subscribe((value) => {
            this.notificationService.showToastInfo(value)
            this.clipboardService.copyFromContent(data)
        })
    }
}
