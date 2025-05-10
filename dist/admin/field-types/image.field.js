import { BaseField } from './base.field.js';
export class ImageField extends BaseField {
    _configuration;
    constructor(value, configuration = {}) {
        super(value);
        this._configuration = {
            thumbnailSize: configuration.thumbnailSize || { width: 200, height: 200 },
            allowedExtensions: configuration.allowedExtensions || ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            maxSize: configuration.maxSize || 5 * 1024 * 1024,
        };
    }
    get configuration() {
        return this._configuration;
    }
}
