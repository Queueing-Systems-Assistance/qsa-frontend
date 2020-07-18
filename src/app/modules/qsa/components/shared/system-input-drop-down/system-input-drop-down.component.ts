import { Component, EventEmitter, Input, Output } from '@angular/core'
import { SystemFeature } from '../../../model/system/system.feature'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'system-input-drop-down-component',
    templateUrl: './system-input-drop-down.component.html'
})
export class SystemInputDropDownComponent {
    @Input() tooltip: string
    @Input() systemFeatures: Array<SystemFeature>
    @Input() formGroup: FormGroup
    @Input() formGroupName: string
    @Output() onChange: EventEmitter<void> = new EventEmitter<void>()
}
