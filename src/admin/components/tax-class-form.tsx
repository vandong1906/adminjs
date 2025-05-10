import React, { useState, useEffect } from 'react';
import { Box, H3, Label, Text, Button, MessageBox, Loader, FormGroup } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import styled from 'styled-components';

// Create styled components for inputs
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

const TaxClassForm = (props) => {
  const { record, resource, action } = props;
  const isEditing = record && record.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });
  const api = new ApiClient();

  // Load tax class data if editing
  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: record.params.name || '',
      });
    }
  }, [isEditing, record]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const apiEndpoint = isEditing 
        ? `/admin/api/tax-classes/${record.id}`
        : '/admin/api/tax-classes';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(apiEndpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred while saving the tax class');
      }
      
      const data = await response.json();
      
      setSuccess(true);
      
      // Redirect to the tax class list after a short delay if creating new tax class
      if (!isEditing) {
        setTimeout(() => {
          window.location.href = '/admin/resources/TaxClass';
        }, 1500);
      }
    } catch (e) {
      console.error('Error saving tax class:', e);
      setError(e.message || 'Failed to save tax class. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !formData.name && isEditing) {
    return (
      <Box>
        <Loader />
        <Text mt="default">Loading...</Text>
      </Box>
    );
  }
  
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <H3 mb="xl">{isEditing ? 'Edit Tax Class' : 'Create New Tax Class'}</H3>
      
      {error && (
        <MessageBox mb="xl" message={error} variant="danger" />
      )}
      
      {success && (
        <MessageBox mb="xl" message="Tax class saved successfully!" variant="success" />
      )}
      
      <Box mb="xl">
        <FormGroup>
          <Label required>Name</Label>
          <TextInput
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Text mt="sm" as="p" fontSize="sm" color="grey80">
            Examples: Standard Rate, Reduced Rate, Zero Rate, etc.
          </Text>
        </FormGroup>
      </Box>
      
      <Box>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Tax Class'}
        </Button>
      </Box>
    </Box>
  );
};

export default TaxClassForm; 