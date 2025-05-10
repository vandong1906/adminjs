import { Model, ModelAttributeColumnOptions } from 'sequelize';
import { AttributeDataCast } from './attribute-data.cast.js';
import { BaseField } from './base.field.js';

// Extension method to handle attribute data in Sequelize models
export function setupAttributeDataHandling() {
  // Add a custom getter for attribute_data
  const originalGet = Model.prototype.get;
  
  // @ts-ignore - Extending prototype
  Model.prototype.get = function(this: any, key: string, options: any) {
    if (key === 'attribute_data') {
      const rawValue = originalGet.call(this, key, options);
      return AttributeDataCast.cast(rawValue);
    }
    return originalGet.call(this, key, options);
  };

  // Add a custom setter for attribute_data
  const originalSet = Model.prototype.set;
  
  // @ts-ignore - Extending prototype
  Model.prototype.set = function(this: any, key: string, value: any, options: any) {
    if (key === 'attribute_data' && typeof value === 'object') {
      // Check if value is already an object of BaseField instances
      if (Object.values(value).every(v => v instanceof BaseField)) {
        return originalSet.call(this, key, value, options);
      }
      
      // Convert to our field type structure
      const attributeData = AttributeDataCast.cast(value);
      return originalSet.call(this, key, attributeData, options);
    }
    return originalSet.call(this, key, value, options);
  };
  
  // Customize toJSON to handle attribute_data
  const originalToJSON = Model.prototype.toJSON;
  
  // @ts-ignore - Extending prototype
  Model.prototype.toJSON = function(this: any, options: any) {
    const json = originalToJSON.call(this, options);
    
    // Serialize attribute_data if it exists and is in our field type format
    if (json.attribute_data && typeof json.attribute_data === 'object') {
      const isFieldTypeFormat = Object.values(json.attribute_data).some(
        (v: any) => v instanceof BaseField
      );
      
      if (isFieldTypeFormat) {
        json.attribute_data = JSON.parse(AttributeDataCast.serialize(json.attribute_data));
      }
    }
    
    return json;
  };
}

// Helper function to extend model options to handle attribute data
export function withAttributeData<T extends Model>(model: any): T {
  // Add custom getters/setters for attributes
  const originalGetAttributeValue = model.prototype.getDataValue;
  
  model.prototype.getDataValue = function(key: string) {
    if (key === 'attribute_data') {
      const value = originalGetAttributeValue.call(this, key);
      return AttributeDataCast.cast(value);
    }
    return originalGetAttributeValue.call(this, key);
  };
  
  model.prototype.setDataValue = function(key: string, value: any) {
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

// Extension method to get attribute values more easily
export function addAttributeHelpers(modelPrototype: any) {
  // Get an attribute value (with language support for translated fields)
  modelPrototype.getAttribute = function(this: any, key: string, locale?: string) {
    const attributeData = this.get('attribute_data') || {};
    const field = attributeData[key];
    
    if (!field) return null;
    
    if (field.constructor.name === 'TranslatedTextField' && locale) {
      return field.getTranslation(locale);
    }
    
    return field.value;
  };
  
  // Set an attribute value
  modelPrototype.setAttribute = function(this: any, key: string, value: any, locale?: string) {
    const attributeData = this.get('attribute_data') || {};
    
    if (locale && attributeData[key]?.constructor.name === 'TranslatedTextField') {
      attributeData[key].setTranslation(locale, value);
    } else {
      // Determine type based on value
      if (typeof value === 'number') {
        const { NumberField } = require('./number.field.js');
        attributeData[key] = new NumberField(value);
      } else if (typeof value === 'object' && value.url) {
        const { ImageField } = require('./image.field.js');
        attributeData[key] = new ImageField(value);
      } else if (Array.isArray(value)) {
        const { ListField } = require('./list.field.js');
        attributeData[key] = new ListField(value);
      } else {
        const { TextField } = require('./text.field.js');
        attributeData[key] = new TextField(String(value));
      }
    }
    
    this.set('attribute_data', attributeData);
  };
} 