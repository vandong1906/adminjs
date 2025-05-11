import React, { useState } from 'react';
import { Box, Button, Label,Input, Select } from '@adminjs/design-system';


const AttributeGroupForm = (props: any) => {
  const { record, onChange } = props;
  const [name, setName] = useState(record?.params?.name ? JSON.stringify(record.params.name) : '');
  const [handle, setHandle] = useState(record?.params?.handle || '');
  const [position, setPosition] = useState(record?.params?.position || 0);
  const [attributableType, setAttributableType] = useState(record?.params?.attributable_type || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: JSON.parse(name),
      handle,
      position: parseInt(position),
      attributable_type: attributableType,
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
          placeholder='{"en": "Group Name"}'
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
        <Label>Position</Label>
        <Input
          type="number"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Box>

      <Box mb="xl">
        <Label>Attributable Type</Label>
        <Select
          value={attributableType}
          onChange={(e) => setAttributableType(e.target.value)}
          options={[
            { value: 'product', label: 'Product' },
            { value: 'collection', label: 'Collection' }
          ]}
        />
      </Box>

      <Button type="submit">Save</Button>
    </Box>
  );
};

export default AttributeGroupForm;