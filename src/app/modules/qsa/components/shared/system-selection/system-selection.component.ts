import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SystemView} from '../../../model/system/system.view';
import {Status} from '../../../model/system/status';

@Component({
    selector: 'system-selection-component',
    templateUrl: './system-selection.component.html'
})
export class SystemSelectionComponent {

    @Input() systemViews: SystemView[];
    @Input() systemViewsInputForm: FormGroup;
    @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

    public change(id: string): void {
        this.onChange.emit(id);
    }

    public isSystemBeta(systemView: SystemView): boolean {
        return Status[Status.BETA] === systemView.status.toString();
    }
}
