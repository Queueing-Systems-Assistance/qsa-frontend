import { Component, Input } from '@angular/core'
import { SystemFeature } from '../../../model/system/system.feature'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'system-input-component',
    templateUrl: './system-input.component.html',
})
export class SystemInputComponent {
    @Input() systemInputsTitle: string
    @Input() systemFeatures: SystemFeature[]
    @Input() systemInputForm: FormGroup
    @Input() systemInputFormName: string
}
