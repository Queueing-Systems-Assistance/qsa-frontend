import { Component } from '@angular/core'

@Component({
    selector: 'footer-component',
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    public startedYear = 2018
    public currentYear = new Date().getFullYear()
}
