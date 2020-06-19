import { Observer, ReplaySubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MathContent } from "./math-content";
import { Logger } from "../qsa/services/logger";

declare global {
    interface Window {
      hubReady: Observer<boolean>;
    }
}

@Injectable()
export class MathService {
  private readonly notifier: ReplaySubject<boolean>;

  constructor() {
    this.notifier = new ReplaySubject<boolean>();
    window.hubReady = this.notifier;
  }

  ready(): Observable<boolean> {
    return this.notifier;
  }

  render(element: HTMLElement, mathContent?: MathContent): void {
    if (mathContent) {
        
        let content: string = mathContent.getContent();

        if (content) {
            element.innerText = content;
            Logger.i(this, 'LaTeX string to be displayed: ', content);
        }else{
          Logger.e(this, 'Invalid LaTeX string: ', content);
        }
    }else{
      Logger.e(this, 'Math content undefined: ', mathContent);
    }

    MathJax.Hub.Queue(['Typeset', MathJax.Hub, element]);
  }
}