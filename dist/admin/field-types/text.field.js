import { BaseField } from './base.field.js';
export class TextField extends BaseField {
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
}
