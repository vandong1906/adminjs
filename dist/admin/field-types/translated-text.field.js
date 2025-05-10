import { BaseField } from './base.field.js';
import { TextField } from './text.field.js';
export class TranslatedTextField extends BaseField {
    _configuration;
    constructor(value, configuration = {}) {
        super(value);
        this._configuration = {
            type: configuration.type || 'single-line',
        };
    }
    get configuration() {
        return this._configuration;
    }
    getTranslation(locale) {
        const translations = this._value;
        return translations[locale]?.value || null;
    }
    setTranslation(locale, value) {
        const translations = this._value;
        const config = { type: this._configuration.type };
        translations[locale] = new TextField(value, config);
    }
}
