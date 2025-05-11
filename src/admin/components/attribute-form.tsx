import React, { useState, useEffect } from 'react';
import { Box, Button, Label, Input, Select, CheckBox, TextArea } from '@adminjs/design-system';

const AttributeForm = (props: any) => {
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
  const [configuration, setConfiguration] = useState(
    record?.params?.configuration ? JSON.stringify(record.params.configuration) : '{}'
  );
  const [system, setSystem] = useState(record?.params?.system || false);
  const [filterable, setFilterable] = useState(record?.params?.filterable || false);
  const [searchable, setSearchable] = useState(record?.params?.searchable || false);
  const [attributeGroupId, setAttributeGroupId] = useState(record?.params?.attribute_group_id || '');

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Box mb="xl">
        <Label>Name (JSON)</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='{"en": "Attribute Name"}'
        />
      </Box>

      <Box mb="xl">
        <Label>Description (JSON)</Label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='{"en": "Attribute Description"}'
        />
      </Box>

      <Box mb="xl">
        <Label>Handle</Label>
        <Input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
      </Box>

      <Box mb="xl">
        <Label>Attribute Type</Label>
        <Select
          value={attributeType}
          onChange={(e) => setAttributeType(e.target.value)}
          options={[
            { value: 'product', label: 'Product' },
            { value: 'collection', label: 'Collection' }
          ]}
        />
      </Box>

      <Box mb="xl">
        <Label>Field Type</Label>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={[
            { value: 'text', label: 'Text' },
            { value: 'textarea', label: 'Text Area' },
            { value: 'number', label: 'Number' },
            { value: 'select', label: 'Select' },
            { value: 'multiselect', label: 'Multi Select' },
            { value: 'boolean', label: 'Boolean' },
            { value: 'date', label: 'Date' },
            { value: 'image', label: 'Image' },
            { value: 'json', label: 'JSON' }
          ]}
        />
      </Box>

      <Box mb="xl">
        <Label>Position</Label>
        <Input
          type="number"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Box>

      <Box mb="xl">
        <Label>Section</Label>
        <Input
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
      </Box>

      <Box mb="xl">
        <Label>Configuration (JSON)</Label>
        <TextArea
          value={configuration}
          onChange={(e) => setConfiguration(e.target.value)}
          placeholder='{"options": [], "max": 100, "min": 0}'
        />
      </Box>

      <Box mb="xl">
        <Label>Default Value</Label>
        <Input
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
        />
      </Box>

      <Box mb="xl">
        <CheckBox
          checked={required}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequired(e.target.checked)}
          label="Required"
        />
      </Box>

      <Box mb="xl">
        <CheckBox
          checked={system}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSystem(e.target.checked)}
          label="System"
        />
      </Box>

      <Box mb="xl">
        <CheckBox
          checked={filterable}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterable(e.target.checked)}
          label="Filterable"
        />
      </Box>

      <Box mb="xl">
        <CheckBox
          checked={searchable}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchable(e.target.checked)}
          label="Searchable"
        />
      </Box>

      <Button type="submit">Save</Button>
    </Box>
  );
};

export default AttributeForm;