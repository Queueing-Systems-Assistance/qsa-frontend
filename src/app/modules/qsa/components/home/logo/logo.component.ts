import { AfterViewInit, Component, Input } from '@angular/core'
import { fromEvent } from 'rxjs'
import { distinctUntilChanged, map, share, throttleTime } from 'rxjs/operators'

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styles: []
})
export class LogoComponent implements AfterViewInit {
    @Input()
    sticky: boolean
    @Input()
    hideAtPos: number

    hidden = false

    ngAfterViewInit(): void {
        const scrollPos$ = fromEvent(window, 'scroll').pipe(
            throttleTime(10),
            map(() => window.pageYOffset),
            distinctUntilChanged(),
            share()
        )

        scrollPos$.subscribe(yPos => (this.hidden = yPos >= this.hideAtPos))
    }
}
