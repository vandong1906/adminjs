import React from 'react';
import { Box, Label } from '@adminjs/design-system';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

interface JsonEditorProps {
  onChange: (value: any) => void;
  value: any;
  label?: string;
  disabled?: boolean;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onChange, value, label, disabled }) => {
  const handleChange = (data: { json: string; error: boolean }) => {
    if (data.error) {
      return;
    }
    try {
      const parsedValue = JSON.parse(data.json);
      onChange(parsedValue);
    } catch (e) {
      // Invalid JSON, ignore
    }
  };

  const JSONInputComponent = JSONInput as unknown as React.ComponentType<any>;

  return (
    <Box>
      {label && <Label>{label}</Label>}
      <JSONInputComponent
        id="json-editor"
        placeholder={value || {}}
        locale={locale}
        height="200px"
        width="100%"
        onChange={handleChange}
        style={{
          body: { background: '#f5f5f5' },
          outerBox: { border: '1px solid #C0C9D4' },
          container: { border: 'none' },
        }}
        disabled={disabled}
        viewOnly={disabled}
      />
    </Box>
  );
};

export default JsonEditor; 