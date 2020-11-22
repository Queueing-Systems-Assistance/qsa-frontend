import { Component, Input } from '@angular/core'

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styles: []
})
export class LogoComponent {
    @Input()
    vertical: boolean
}
