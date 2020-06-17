import { Observer, ReplaySubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MathContent } from "./math-content";

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

  render(element: HTMLElement, math?: MathContent): void {
    if (math) {
        
        let content: string = math.getContent();

        if (content) {
            element.innerText = content;
        }
    }

    MathJax.Hub.Queue(['Typeset', MathJax.Hub, element]);
  }
}