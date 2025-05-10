import { BaseField } from './base.field.js';
import { TextField } from './text.field.js';
import { NumberField } from './number.field.js';
import { TranslatedTextField } from './translated-text.field.js';
import { ListField } from './list.field.js';
import { ImageField, ImageValue } from './image.field.js';

export class AttributeDataCast {
  static cast(value: any): Record<string, BaseField> {
    if (!value) return {};
    
    try {
      const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
      const result: Record<string, BaseField> = {};
      
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
            const translations: Record<string, TextField> = {};
            for (const [locale, text] of Object.entries(fieldValue as Record<string, any>)) {
              translations[locale] = new TextField(String(text));
            }
            result[key] = new TranslatedTextField(translations, configuration);
            break;
          }
          case 'list':
            result[key] = new ListField(Array.isArray(fieldValue) ? fieldValue.map(String) : [String(fieldValue)]);
            break;
          case 'image':
            result[key] = new ImageField(fieldValue as ImageValue, configuration);
            break;
          default:
            result[key] = new TextField(String(fieldValue));
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error casting attribute data:', error);
      return {};
    }
  }
  
  static serialize(attributeData: Record<string, BaseField>): string {
    if (!attributeData) return '{}';
    
    const serialized: Record<string, any> = {};
    
    for (const [key, field] of Object.entries(attributeData)) {
      let type = 'text';
      
      if (field instanceof TextField) type = 'text';
      else if (field instanceof NumberField) type = 'number';
      else if (field instanceof TranslatedTextField) type = 'translated-text';
      else if (field instanceof ListField) type = 'list';
      else if (field instanceof ImageField) type = 'image';
      
      serialized[key] = {
        type,
        value: field.value,
        configuration: (field as any).configuration || {}
      };
    }
    
    return JSON.stringify(serialized);
  }
  
  private static parseFieldData(fieldData: any): { type: string; value: any; configuration?: any } {
    if (typeof fieldData === 'object' && fieldData !== null) {
      if ('type' in fieldData && 'value' in fieldData) {
        return fieldData;
      } else {
        // Handle legacy format or direct value objects
        return {
          type: this.inferType(fieldData),
          value: fieldData
        };
      }
    }
    
    // Direct primitive values
    return {
      type: this.inferType(fieldData),
      value: fieldData
    };
  }
  
  private static inferType(value: any): string {
    if (typeof value === 'number') return 'number';
    if (Array.isArray(value)) return 'list';
    if (typeof value === 'object' && value !== null) {
      if ('url' in value) return 'image';
      
      // Check for translated text structure (key-value object)
      const keys = Object.keys(value);
      if (keys.length > 0 && keys.every(k => typeof k === 'string' && k.length === 2)) {
        return 'translated-text';
      }
      
      return 'text';
    }
    
    return 'text';
  }
} 