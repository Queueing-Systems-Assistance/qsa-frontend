import { Observer, ReplaySubject, Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { Logger } from '../qsa/services/logger'

declare global {
    interface Window {
        hubReady: Observer<boolean>
    }
}

@Injectable()
export class MathService {
    private readonly notifier: ReplaySubject<boolean>

    constructor() {
        this.notifier = new ReplaySubject<boolean>()
        window.hubReady = this.notifier
    }

    ready(): Observable<boolean> {
        return this.notifier
    }

    render(element: HTMLElement, mathContent?: string): void {
        if (mathContent) {
            if (mathContent) {
                element.innerText = mathContent
                Logger.i(this, 'LaTeX string to be displayed: ', mathContent)
            } else {
                Logger.e(this, 'Invalid LaTeX string: ', mathContent)
            }
        } else {
            Logger.e(this, 'Math content undefined: ', mathContent)
        }

        MathJax.Hub.Queue(['Typeset', MathJax.Hub, element])
    }
}
