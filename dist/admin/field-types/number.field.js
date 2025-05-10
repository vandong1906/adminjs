import { BaseField } from './base.field.js';
export class NumberField extends BaseField {
    _configuration;
    constructor(value, configuration = {}) {
        super(value);
        this._configuration = {
            type: configuration.type || 'integer',
        };
    }
    get configuration() {
        return this._configuration;
    }
}
