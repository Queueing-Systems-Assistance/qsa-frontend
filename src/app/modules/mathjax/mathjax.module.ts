import { NgModule, ModuleWithProviders } from '@angular/core'
import { MathContentDirective } from './math-content.directive'
import { MathService } from './math.service'

@NgModule({
    declarations: [MathContentDirective],
    exports: [MathContentDirective]
})
export class MathjaxModule {
    constructor(mathService: MathService) {
        // see https://docs.mathjax.org/en/latest/advanced/dynamic.html
        const script = document.createElement('script') as HTMLScriptElement
        script.type = 'text/javascript'
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML'
        script.async = true

        document.getElementsByTagName('head')[0].appendChild(script)

        const config = document.createElement('script') as HTMLScriptElement
        config.type = 'text/x-mathjax-config'
        // register notifier to StartupHook and trigger .next() for all subscribers
        config.text = `
    MathJax.Hub.Config({
        skipStartupTypeset: true,
        tex2jax: { inlineMath: [["$", "$"]],displayMath:[["$$", "$$"]] }
      });
      MathJax.Hub.Register.StartupHook('End', () => {
        window.hubReady.next();
        window.hubReady.complete();
      });
    `

        document.getElementsByTagName('head')[0].appendChild(config)
    }

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MathjaxModule,
            providers: [{ provide: MathService, useClass: MathService }]
        }
    }
}
