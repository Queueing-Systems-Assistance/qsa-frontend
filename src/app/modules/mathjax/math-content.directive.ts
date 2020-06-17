import { Directive, OnInit, OnChanges, OnDestroy, Input, ElementRef, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";
import { take, takeUntil } from 'rxjs/operators';
import { MathContent } from "./math-content";
import { MathService } from "./math.service";

@Directive({
    selector: '[mathContent]'
  })
export class MathContentDirective implements OnInit, OnChanges, OnDestroy {
    private alive$ = new Subject<boolean>();

    @Input()
    private mathContent: MathContent;
    private readonly _el: HTMLElement;
  
    constructor(private service: MathService,
                private el: ElementRef) {
      this._el = el.nativeElement as HTMLElement;
    }
  
    ngOnInit(): void {
      this.service
        .ready()
        .pipe(
          take(1),
          takeUntil(this.alive$)
        ).subscribe(res => {
          this.service.render(this._el, this.mathContent);
      });
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
    }
  
    ngOnDestroy(): void {
      this.alive$.next(false);
    }
  }