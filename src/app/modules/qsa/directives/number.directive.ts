import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {SystemFeature} from '../model/system/system.feature';

@Directive({
    selector: 'input[numbersOnly]'
})
export class NumberDirective {

    @Input() systemFeature: SystemFeature;

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('input', ['$event']) onInputChange(event) {
        if (this.systemFeature.number === 'integer') {
            const initValue = this.elementRef.nativeElement.value;
            this.elementRef.nativeElement.value = initValue.replace(/[^0-9]*/g, '');
            if (initValue !== this.elementRef.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}
