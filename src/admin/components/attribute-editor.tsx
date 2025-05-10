import React, { useState, useEffect } from 'react';
import { Box, H3, Label, Text, Button, MessageBox, Loader, FormGroup, TextArea } from '@adminjs/design-system';
import { ApiClient, RecordJSON } from 'adminjs';

// Import styled components for missing components
import styled from 'styled-components';

// Create styled components for missing design-system components
const TextInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;

const Switch = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #e4e7ea;
  border-radius: 10px;
  transition: background-color 0.3s;
  cursor: pointer;
  
  &:checked {
    background-color: #1DC9A4;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: transform 0.3s;
  }
  
  &:checked::before {
    transform: translateX(20px);
  }
`;

// Field renderer component based on attribute type
const AttributeField = ({ attribute, value, onChange }) => {
  const { type, handle, name, required, configuration = {} } = attribute;
  const jsonName = typeof name === 'object' ? name.en || Object.values(name)[0] : name;
  
  switch (type) {
    case 'text':
      return (
        <FormGroup>
          <Label required={required}>{jsonName}</Label>
          <TextInput
            id={handle}
            name={handle}
            onChange={(e) => onChange(handle, e.target.value)}
            value={value || ''}
            required={required}
            {...configuration}
          />
        </FormGroup>
      );
    case 'number':
      return (
        <FormGroup>
          <Label required={required}>{jsonName}</Label>
          <TextInput
            id={handle}
            name={handle}
            type="number"
            onChange={(e) => onChange(handle, parseFloat(e.target.value))}
            value={value || ''}
            required={required}
            {...configuration}
          />
        </FormGroup>
      );
    case 'translated-text':
      // Simple version for now - just handling English
      return (
        <FormGroup>
          <Label required={required}>{jsonName} (English)</Label>
          <TextInput
            id={`${handle}-en`}
            name={`${handle}-en`}
            onChange={(e) => onChange(handle, { en: e.target.value })}
            value={(value && value.en) || ''}
            required={required}
            {...configuration}
          />
        </FormGroup>
      );
    case 'textarea':
      return (
        <FormGroup>
          <Label required={required}>{jsonName}</Label>
          <TextArea
            id={handle}
            name={handle}
            onChange={(e) => onChange(handle, e.target.value)}
            value={value || ''}
            required={required}
            {...configuration}
          />
        </FormGroup>
      );
    case 'list':
      // Simple implementation - comma separated values
      return (
        <FormGroup>
          <Label required={required}>{jsonName} (comma separated)</Label>
          <TextInput
            id={handle}
            name={handle}
            onChange={(e) => onChange(handle, e.target.value.split(',').map(item => item.trim()))}
            value={Array.isArray(value) ? value.join(', ') : value || ''}
            required={required}
            {...configuration}
          />
        </FormGroup>
      );
    case 'boolean':
      return (
        <FormGroup>
          <Label>{jsonName}</Label>
          <Switch
            id={handle}
            name={handle}
            onChange={(e) => onChange(handle, e.target.checked)}
            checked={!!value}
            {...configuration}
          />
        </FormGroup>
      );
    case 'image':
      return (
        <FormGroup>
          <Label required={required}>{jsonName}</Label>
          <Box>
            {value && value.url && (
              <Box mb="default">
                <img 
                  src={value.url} 
                  alt={value.alt || jsonName} 
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              </Box>
            )}
            <TextInput
              id={`${handle}-url`}
              name={`${handle}-url`}
              placeholder="Image URL"
              onChange={(e) => onChange(handle, { ...value, url: e.target.value })}
              value={(value && value.url) || ''}
              required={required}
            />
            <TextInput
              id={`${handle}-alt`}
              name={`${handle}-alt`}
              placeholder="Alt text"
              onChange={(e) => onChange(handle, { ...value, alt: e.target.value })}
              value={(value && value.alt) || ''}
              style={{ marginTop: '8px' }}
            />
          </Box>
        </FormGroup>
      );
    default:
      return (
        <FormGroup>
          <Label required={required}>{jsonName}</Label>
          <TextInput
            id={handle}
            name={handle}
            onChange={(e) => onChange(handle, e.target.value)}
            value={value || ''}
            required={required}
          />
        </FormGroup>
      );
  }
};

interface AttributeEditorProps {
  record?: RecordJSON;
  onChange?: (propertyName: string, value: any) => void;
}

const AttributeEditor: React.FC<AttributeEditorProps> = (props) => {
  const { record, onChange } = props;
  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch product attributes on component mount
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/admin/api/product-attributes');
        if (response.ok) {
          const data = await response.json();
          setAttributes(data);
          
          // Initialize attribute values from record
          if (record && record.params.attribute_data) {
            let initialValues;
            try {
              initialValues = typeof record.params.attribute_data === 'string'
                ? JSON.parse(record.params.attribute_data)
                : record.params.attribute_data;
              
              setAttributeValues(initialValues);
            } catch (e) {
              console.error('Error parsing attribute data:', e);
              setAttributeValues({});
            }
          }
        } else {
          setError('Failed to load attributes');
        }
      } catch (e) {
        console.error('Error loading attributes:', e);
        setError(`Error loading attributes: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAttributes();
  }, [record]);
  
  // Update record when attribute values change
  useEffect(() => {
    if (!loading && Object.keys(attributeValues).length > 0 && onChange) {
      onChange('attribute_data', attributeValues);
    }
  }, [attributeValues, loading, onChange]);
  
  const handleAttributeChange = (handle, value) => {
    setAttributeValues(prev => ({
      ...prev,
      [handle]: { type: getAttributeType(handle), value }
    }));
  };
  
  const getAttributeType = (handle) => {
    const attribute = attributes.find(attr => attr.handle === handle);
    return attribute ? attribute.type : 'text';
  };
  
  if (loading) {
    return (
      <Box>
        <Loader />
        <Text mt="default">Loading attributes...</Text>
      </Box>
    );
  }
  
  if (error) {
    return <MessageBox message={error} variant="danger" />;
  }
  
  return (
    <Box>
      <H3 mb="lg">Product Attributes</H3>
      
      {attributes.length === 0 ? (
        <MessageBox message="No attributes found for this product type" variant="info" />
      ) : (
        <Box>
          {attributes.map(attribute => {
            // Get the current value for this attribute from the state
            const attributeData = attributeValues[attribute.handle] || {};
            
            return (
              <Box key={attribute.handle} mb="xl">
                <AttributeField
                  attribute={attribute}
                  value={attributeData.value}
                  onChange={handleAttributeChange}
                />
                {attribute.description && (
                  <Text mt="sm" variant="sm" color="grey60">
                    {typeof attribute.description === 'object' 
                      ? attribute.description.en || Object.values(attribute.description)[0] 
                      : attribute.description}
                  </Text>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default AttributeEditor; 