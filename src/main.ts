import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { environment } from "./environments/environment";
import { QsaModule } from "./app/modules/qsa/qsa.module";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(QsaModule).catch(err => console.error(err));

