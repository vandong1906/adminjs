import React, { useState, useEffect } from 'react';
import { Box, H3, Label, Text, MessageBox, Loader, FormGroup, TextArea } from '@adminjs/design-system';
import styled from 'styled-components';
const TextInput = styled.input `
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
const Switch = styled.input.attrs({ type: 'checkbox' }) `
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
const AttributeField = ({ attribute, value, onChange }) => {
    const { type, handle, name, required, configuration = {} } = attribute;
    const jsonName = typeof name === 'object' ? name.en || Object.values(name)[0] : name;
    switch (type) {
        case 'text':
            return (React.createElement(FormGroup, null,
                React.createElement(Label, { required: required }, jsonName),
                React.createElement(TextInput, { id: handle, name: handle, onChange: (e) => onChange(handle, e.target.value), value: value || '', required: required, ...configuration })));
        case 'number':
            return (React.createElement(FormGroup, null,
                React.createElement(Label, { required: required }, jsonName),
                React.createElement(TextInput, { id: handle, name: handle, type: "number", onChange: (e) => onChange(handle, parseFloat(e.target.value)), value: value || '', required: required, ...configuration })));
        case 'translated-text':
            return (React.createElement(FormGroup, null,
                React.createElement(Label, { required: required },
                    jsonName,
                    " (English)"),
                React.createElement(TextInput, { id: `${handle}-en`, name: `${handle}-en`, onChange: (e) => onChange(handle, { en: e.target.value }), value: (value && value.en) || '', required: required, ...configuration })));
        case 'textarea':
            return (React.createElement(FormGroup, null,
                React.createElement(Label, { required: required }, jsonName),
                React.createElement(TextArea, { id: handle, name: handle, onChange: (e) => onChange(handle, e.target.value), value: value || '', required: required, ...configuration })));
        case 'list':
            return (React.createElement(FormGroup, null,
                React.createElement(Label, { required: required },
                    jsonName,
                    " (comma separated)"),
                React.createElement(TextInput, { id: handle, name: handle, onChange: (e) => onChange(handle, e.target.value.split(',').map(item => item.trim())), value: Array.isArray(value) ? value.join(', ') : value || '', required: required, ...configuration })));
        case 'boolean':
            return (React.createElement(FormGroup, null,
                React.createElement(Label, null, jsonName),
                React.createElement(Switch, { id: handle, name: handle, onChange: (e) => onChange(handle, e.target.checked), checked: !!value, ...configuration })));
        case 'image':
            return (React.createElement(FormGroup, null,
                React.createElement(Label, { required: required }, jsonName),
                React.createElement(Box, null,
                    value && value.url && (React.createElement(Box, { mb: "default" },
                        React.createElement("img", { src: value.url, alt: value.alt || jsonName, style: { maxWidth: '200px', maxHeight: '200px' } }))),
                    React.createElement(TextInput, { id: `${handle}-url`, name: `${handle}-url`, placeholder: "Image URL", onChange: (e) => onChange(handle, { ...value, url: e.target.value }), value: (value && value.url) || '', required: required }),
                    React.createElement(TextInput, { id: `${handle}-alt`, name: `${handle}-alt`, placeholder: "Alt text", onChange: (e) => onChange(handle, { ...value, alt: e.target.value }), value: (value && value.alt) || '', style: { marginTop: '8px' } }))));
        default:
            return (React.createElement(FormGroup, null,
                React.createElement(Label, { required: required }, jsonName),
                React.createElement(TextInput, { id: handle, name: handle, onChange: (e) => onChange(handle, e.target.value), value: value || '', required: required })));
    }
};
const AttributeEditor = (props) => {
    const { record, onChange } = props;
    const [attributes, setAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                setLoading(true);
                const response = await fetch('/admin/api/product-attributes');
                if (response.ok) {
                    const data = await response.json();
                    setAttributes(data);
                    if (record && record.params.attribute_data) {
                        let initialValues;
                        try {
                            initialValues = typeof record.params.attribute_data === 'string'
                                ? JSON.parse(record.params.attribute_data)
                                : record.params.attribute_data;
                            setAttributeValues(initialValues);
                        }
                        catch (e) {
                            console.error('Error parsing attribute data:', e);
                            setAttributeValues({});
                        }
                    }
                }
                else {
                    setError('Failed to load attributes');
                }
            }
            catch (e) {
                console.error('Error loading attributes:', e);
                setError(`Error loading attributes: ${e.message}`);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAttributes();
    }, [record]);
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
        return (React.createElement(Box, null,
            React.createElement(Loader, null),
            React.createElement(Text, { mt: "default" }, "Loading attributes...")));
    }
    if (error) {
        return React.createElement(MessageBox, { message: error, variant: "danger" });
    }
    return (React.createElement(Box, null,
        React.createElement(H3, { mb: "lg" }, "Product Attributes"),
        attributes.length === 0 ? (React.createElement(MessageBox, { message: "No attributes found for this product type", variant: "info" })) : (React.createElement(Box, null, attributes.map(attribute => {
            const attributeData = attributeValues[attribute.handle] || {};
            return (React.createElement(Box, { key: attribute.handle, mb: "xl" },
                React.createElement(AttributeField, { attribute: attribute, value: attributeData.value, onChange: handleAttributeChange }),
                attribute.description && (React.createElement(Text, { mt: "sm", variant: "sm", color: "grey60" }, typeof attribute.description === 'object'
                    ? attribute.description.en || Object.values(attribute.description)[0]
                    : attribute.description))));
        })))));
};
export default AttributeEditor;
