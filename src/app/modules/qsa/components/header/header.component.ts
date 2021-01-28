import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AboutModal } from '../modals/about/about.modal'
import { SystemViewService } from '../../services/system.view.service'

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    public collapsed = true
    public title = 'QSA'

    constructor(
        private translateService: TranslateService,
        private systemViewService: SystemViewService,
        private modalService: NgbModal
    ) {}

    public ngOnInit(): void {
        this.initLanguage()
    }

    public toggleCollapsed(): void {
        this.collapsed = !this.collapsed
    }

    public useLanguage(language: string): void {
        localStorage.setItem('locale', language)
        window.location.reload()
    }

    public showAboutModal(): void {
        this.modalService.open(AboutModal)
    }

    private initLanguage(): void {
        this.translateService.onLangChange.subscribe(() => {
            this.systemViewService.loadSystemViews(true)
        })
    }
}
