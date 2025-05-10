import { Model } from 'sequelize';
import { AttributeDataCast } from './attribute-data.cast.js';
import { BaseField } from './base.field.js';
export function setupAttributeDataHandling() {
    const originalGet = Model.prototype.get;
    Model.prototype.get = function (key, options) {
        if (key === 'attribute_data') {
            const rawValue = originalGet.call(this, key, options);
            return AttributeDataCast.cast(rawValue);
        }
        return originalGet.call(this, key, options);
    };
    const originalSet = Model.prototype.set;
    Model.prototype.set = function (key, value, options) {
        if (key === 'attribute_data' && typeof value === 'object') {
            if (Object.values(value).every(v => v instanceof BaseField)) {
                return originalSet.call(this, key, value, options);
            }
            const attributeData = AttributeDataCast.cast(value);
            return originalSet.call(this, key, attributeData, options);
        }
        return originalSet.call(this, key, value, options);
    };
    const originalToJSON = Model.prototype.toJSON;
    Model.prototype.toJSON = function (options) {
        const json = originalToJSON.call(this, options);
        if (json.attribute_data && typeof json.attribute_data === 'object') {
            const isFieldTypeFormat = Object.values(json.attribute_data).some((v) => v instanceof BaseField);
            if (isFieldTypeFormat) {
                json.attribute_data = JSON.parse(AttributeDataCast.serialize(json.attribute_data));
            }
        }
        return json;
    };
}
export function withAttributeData(model) {
    const originalGetAttributeValue = model.prototype.getDataValue;
    model.prototype.getDataValue = function (key) {
        if (key === 'attribute_data') {
            const value = originalGetAttributeValue.call(this, key);
            return AttributeDataCast.cast(value);
        }
        return originalGetAttributeValue.call(this, key);
    };
    model.prototype.setDataValue = function (key, value) {
        if (key === 'attribute_data' && typeof value === 'object') {
            if (Object.values(value).some(v => v instanceof BaseField)) {
                this.setDataValue(key, AttributeDataCast.serialize(value));
                return;
            }
        }
        this.setDataValue(key, value);
    };
    return model;
}
export function addAttributeHelpers(modelPrototype) {
    modelPrototype.getAttribute = function (key, locale) {
        const attributeData = this.get('attribute_data') || {};
        const field = attributeData[key];
        if (!field)
            return null;
        if (field.constructor.name === 'TranslatedTextField' && locale) {
            return field.getTranslation(locale);
        }
        return field.value;
    };
    modelPrototype.setAttribute = function (key, value, locale) {
        const attributeData = this.get('attribute_data') || {};
        if (locale && attributeData[key]?.constructor.name === 'TranslatedTextField') {
            attributeData[key].setTranslation(locale, value);
        }
        else {
            if (typeof value === 'number') {
                const { NumberField } = require('./number.field.js');
                attributeData[key] = new NumberField(value);
            }
            else if (typeof value === 'object' && value.url) {
                const { ImageField } = require('./image.field.js');
                attributeData[key] = new ImageField(value);
            }
            else if (Array.isArray(value)) {
                const { ListField } = require('./list.field.js');
                attributeData[key] = new ListField(value);
            }
            else {
                const { TextField } = require('./text.field.js');
                attributeData[key] = new TextField(String(value));
            }
        }
        this.set('attribute_data', attributeData);
    };
}
