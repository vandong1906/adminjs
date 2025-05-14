import React from 'react';
import { Box, Button, MessageBox } from '@adminjs/design-system';
import { useRecord, useTranslation, ActionProps } from 'adminjs';

const AttributeActions: React.FC<ActionProps> = (props) => {
  const { record, handleChange, submit } = useRecord(props.record, props.resource.id);
  const { translateButton } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate required fields
      if (!record.params.name) {
        throw new Error('Name is required');
      }
      if (!record.params.handle) {
        throw new Error('Handle is required');
      }
      if (!record.params.attribute_type) {
        throw new Error('Attribute type is required');
      }

      await submit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {error && (
        <MessageBox variant="danger" mb="lg">
          {error}
        </MessageBox>
      )}
      <Button
        onClick={handleSubmit}
        disabled={loading}
        type="button"
        variant="primary"
      >
        {loading ? 'Saving...' : translateButton('save', 'Save')}
      </Button>
    </Box>
  );
};

export default AttributeActions; 