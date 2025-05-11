import React, { useState } from 'react';
import { Box, Button, Label, Input, Select, CheckBox, TextArea } from '@adminjs/design-system';
const AttributeForm = (props) => {
    const { record, onChange } = props;
    const [name, setName] = useState(record?.params?.name ? JSON.stringify(record.params.name) : '');
    const [description, setDescription] = useState(record?.params?.description ? JSON.stringify(record.params.description) : '');
    const [handle, setHandle] = useState(record?.params?.handle || '');
    const [attributeType, setAttributeType] = useState(record?.params?.attribute_type || '');
    const [type, setType] = useState(record?.params?.type || 'text');
    const [position, setPosition] = useState(record?.params?.position || 0);
    const [section, setSection] = useState(record?.params?.section || '');
    const [required, setRequired] = useState(record?.params?.required || false);
    const [defaultValue, setDefaultValue] = useState(record?.params?.default_value || '');
    const [configuration, setConfiguration] = useState(record?.params?.configuration ? JSON.stringify(record.params.configuration) : '{}');
    const [system, setSystem] = useState(record?.params?.system || false);
    const [filterable, setFilterable] = useState(record?.params?.filterable || false);
    const [searchable, setSearchable] = useState(record?.params?.searchable || false);
    const [attributeGroupId, setAttributeGroupId] = useState(record?.params?.attribute_group_id || '');
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: JSON.parse(name),
            description: description ? JSON.parse(description) : null,
            handle,
            attribute_type: attributeType,
            type,
            position: parseInt(position),
            section,
            required,
            default_value: defaultValue || null,
            configuration: JSON.parse(configuration),
            system,
            filterable,
            searchable,
            attribute_group_id: parseInt(attributeGroupId),
        };
        onChange(data);
    };
    return (React.createElement(Box, { as: "form", onSubmit: handleSubmit },
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Name (JSON)"),
            React.createElement(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: '{"en": "Attribute Name"}' })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Description (JSON)"),
            React.createElement(TextArea, { value: description, onChange: (e) => setDescription(e.target.value), placeholder: '{"en": "Attribute Description"}' })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Handle"),
            React.createElement(Input, { value: handle, onChange: (e) => setHandle(e.target.value) })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Attribute Type"),
            React.createElement(Select, { value: attributeType, onChange: (e) => setAttributeType(e.target.value), options: [
                    { value: 'product', label: 'Product' },
                    { value: 'collection', label: 'Collection' }
                ] })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Field Type"),
            React.createElement(Select, { value: type, onChange: (e) => setType(e.target.value), options: [
                    { value: 'text', label: 'Text' },
                    { value: 'textarea', label: 'Text Area' },
                    { value: 'number', label: 'Number' },
                    { value: 'select', label: 'Select' },
                    { value: 'multiselect', label: 'Multi Select' },
                    { value: 'boolean', label: 'Boolean' },
                    { value: 'date', label: 'Date' },
                    { value: 'image', label: 'Image' },
                    { value: 'json', label: 'JSON' }
                ] })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Position"),
            React.createElement(Input, { type: "number", value: position, onChange: (e) => setPosition(e.target.value) })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Section"),
            React.createElement(Input, { value: section, onChange: (e) => setSection(e.target.value) })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Configuration (JSON)"),
            React.createElement(TextArea, { value: configuration, onChange: (e) => setConfiguration(e.target.value), placeholder: '{"options": [], "max": 100, "min": 0}' })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Default Value"),
            React.createElement(Input, { value: defaultValue, onChange: (e) => setDefaultValue(e.target.value) })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(CheckBox, { checked: required, onChange: (e) => setRequired(e.target.checked), label: "Required" })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(CheckBox, { checked: system, onChange: (e) => setSystem(e.target.checked), label: "System" })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(CheckBox, { checked: filterable, onChange: (e) => setFilterable(e.target.checked), label: "Filterable" })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(CheckBox, { checked: searchable, onChange: (e) => setSearchable(e.target.checked), label: "Searchable" })),
        React.createElement(Button, { type: "submit" }, "Save")));
};
export default AttributeForm;
