import { BaseField } from './base.field.js';

export type NumberConfiguration = {
  type: 'integer' | 'decimal';
};

export class NumberField extends BaseField {
  private _configuration: NumberConfiguration;

  constructor(value: number, configuration: Partial<NumberConfiguration> = {}) {
    super(value);
    this._configuration = {
      type: configuration.type || 'integer',
    };
  }

  get configuration(): NumberConfiguration {
    return this._configuration;
  }
} 