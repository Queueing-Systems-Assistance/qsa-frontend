import { Component } from '@angular/core'
import { TabType } from '../../model/tab/tab'

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    public TabType = TabType
}
