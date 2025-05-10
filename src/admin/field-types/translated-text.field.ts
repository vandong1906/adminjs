import { BaseField } from './base.field.js';
import { TextField, TextConfiguration } from './text.field.js';

export type TranslatedTextConfiguration = {
  type: 'single-line' | 'multi-line' | 'rich-text';
};

export class TranslatedTextField extends BaseField {
  private _configuration: TranslatedTextConfiguration;

  constructor(value: Record<string, TextField>, configuration: Partial<TranslatedTextConfiguration> = {}) {
    super(value);
    this._configuration = {
      type: configuration.type || 'single-line',
    };
  }

  get configuration(): TranslatedTextConfiguration {
    return this._configuration;
  }

  getTranslation(locale: string): string | null {
    const translations = this._value as Record<string, TextField>;
    return translations[locale]?.value || null;
  }

  setTranslation(locale: string, value: string): void {
    const translations = this._value as Record<string, TextField>;
    const config: Partial<TextConfiguration> = { type: this._configuration.type };
    translations[locale] = new TextField(value, config);
  }
} 