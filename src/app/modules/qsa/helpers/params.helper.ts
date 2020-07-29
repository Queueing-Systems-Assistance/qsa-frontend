import { HttpParams } from '@angular/common/http'
import { LocaleHelper } from './locale.helper'
import { TranslateService } from '@ngx-translate/core'

export class ParamsHelper {
    public static getParams(translateService: TranslateService): HttpParams {
        return new HttpParams().set('language', LocaleHelper.getCorrectLocale(translateService))
    }
}
