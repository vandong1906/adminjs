import { TextField } from './text.field.js';
import { NumberField } from './number.field.js';
import { TranslatedTextField } from './translated-text.field.js';
import { ListField } from './list.field.js';
import { ImageField } from './image.field.js';
export class AttributeDataCast {
    static cast(value) {
        if (!value)
            return {};
        try {
            const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
            const result = {};
            for (const [key, fieldData] of Object.entries(parsedValue)) {
                const { type, value: fieldValue, configuration = {} } = this.parseFieldData(fieldData);
                switch (type) {
                    case 'text':
                        result[key] = new TextField(String(fieldValue), configuration);
                        break;
                    case 'number':
                        result[key] = new NumberField(Number(fieldValue), configuration);
                        break;
                    case 'translated-text': {
                        const translations = {};
                        for (const [locale, text] of Object.entries(fieldValue)) {
                            translations[locale] = new TextField(String(text));
                        }
                        result[key] = new TranslatedTextField(translations, configuration);
                        break;
                    }
                    case 'list':
                        result[key] = new ListField(Array.isArray(fieldValue) ? fieldValue.map(String) : [String(fieldValue)]);
                        break;
                    case 'image':
                        result[key] = new ImageField(fieldValue, configuration);
                        break;
                    default:
                        result[key] = new TextField(String(fieldValue));
                }
            }
            return result;
        }
        catch (error) {
            console.error('Error casting attribute data:', error);
            return {};
        }
    }
    static serialize(attributeData) {
        if (!attributeData)
            return '{}';
        const serialized = {};
        for (const [key, field] of Object.entries(attributeData)) {
            let type = 'text';
            if (field instanceof TextField)
                type = 'text';
            else if (field instanceof NumberField)
                type = 'number';
            else if (field instanceof TranslatedTextField)
                type = 'translated-text';
            else if (field instanceof ListField)
                type = 'list';
            else if (field instanceof ImageField)
                type = 'image';
            serialized[key] = {
                type,
                value: field.value,
                configuration: field.configuration || {}
            };
        }
        return JSON.stringify(serialized);
    }
    static parseFieldData(fieldData) {
        if (typeof fieldData === 'object' && fieldData !== null) {
            if ('type' in fieldData && 'value' in fieldData) {
                return fieldData;
            }
            else {
                return {
                    type: this.inferType(fieldData),
                    value: fieldData
                };
            }
        }
        return {
            type: this.inferType(fieldData),
            value: fieldData
        };
    }
    static inferType(value) {
        if (typeof value === 'number')
            return 'number';
        if (Array.isArray(value))
            return 'list';
        if (typeof value === 'object' && value !== null) {
            if ('url' in value)
                return 'image';
            const keys = Object.keys(value);
            if (keys.length > 0 && keys.every(k => typeof k === 'string' && k.length === 2)) {
                return 'translated-text';
            }
            return 'text';
        }
        return 'text';
    }
}
