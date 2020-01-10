import {Component, Input} from '@angular/core';

@Component({
    selector: 'empty-system-views-component',
    templateUrl: './empty-system-views.component.html'
})
export class EmptySystemViewsComponent {

    @Input() imageAsset: string;
    @Input() headingText: string;
    @Input() subText: string;

}
