import { TranslateService } from '@ngx-translate/core'
import { Logger } from '../services/logger'

export class LocaleHelper {
    private static LANGUAGES = ['en', 'hu']

    private static DEFAULT_LANGUAGE = 'en'

    public static getCorrectLocale(translateService: TranslateService): string {
        const presetLocale = this.getPresetLocale()
        const userLocale = translateService.currentLang
        let compatibleLanguage = this.DEFAULT_LANGUAGE
        if (this.isLanguageAvailable(presetLocale)) {
            compatibleLanguage = presetLocale
        } else if (this.isLanguageAvailable(userLocale)) {
            compatibleLanguage = userLocale
        }
        Logger.i(this, 'Preset | User | Compatible', presetLocale, userLocale, compatibleLanguage)
        return compatibleLanguage
    }

    private static getPresetLocale() {
        const url = new URL(window.location.href)
        return url.searchParams.get('locale')
    }

    private static isLanguageAvailable(presetLanguage: string): boolean {
        return this.LANGUAGES.includes(presetLanguage)
    }
}
