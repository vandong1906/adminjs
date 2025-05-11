import React, { useState } from 'react';
import { Box, Button, Label, Input, Select } from '@adminjs/design-system';
const AttributeGroupForm = (props) => {
    const { record, onChange } = props;
    const [name, setName] = useState(record?.params?.name ? JSON.stringify(record.params.name) : '');
    const [handle, setHandle] = useState(record?.params?.handle || '');
    const [position, setPosition] = useState(record?.params?.position || 0);
    const [attributableType, setAttributableType] = useState(record?.params?.attributable_type || '');
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: JSON.parse(name),
            handle,
            position: parseInt(position),
            attributable_type: attributableType,
        };
        onChange(data);
    };
    return (React.createElement(Box, { as: "form", onSubmit: handleSubmit },
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Name (JSON)"),
            React.createElement(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: '{"en": "Group Name"}' })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Handle"),
            React.createElement(Input, { value: handle, onChange: (e) => setHandle(e.target.value) })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Position"),
            React.createElement(Input, { type: "number", value: position, onChange: (e) => setPosition(e.target.value) })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(Label, null, "Attributable Type"),
            React.createElement(Select, { value: attributableType, onChange: (e) => setAttributableType(e.target.value), options: [
                    { value: 'product', label: 'Product' },
                    { value: 'collection', label: 'Collection' }
                ] })),
        React.createElement(Button, { type: "submit" }, "Save")));
};
export default AttributeGroupForm;
