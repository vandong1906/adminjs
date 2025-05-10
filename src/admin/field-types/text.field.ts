import { BaseField } from './base.field.js';

export type TextConfiguration = {
  type: 'single-line' | 'multi-line' | 'rich-text';
};

export class TextField extends BaseField {
  private _configuration: TextConfiguration;

  constructor(value: string, configuration: Partial<TextConfiguration> = {}) {
    super(value);
    this._configuration = {
      type: configuration.type || 'single-line',
    };
  }

  get configuration(): TextConfiguration {
    return this._configuration;
  }
} 