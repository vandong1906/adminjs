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

const ProductTypeForm = (props) => {
  const { record, resource, action } = props;
  const isEditing = record && record.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });
  const api = new ApiClient();

  // Load product type data if editing
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
        ? `/admin/api/product-types/${record.id}`
        : '/admin/api/product-types';
      
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
        throw new Error(errorData.error || 'An error occurred while saving the product type');
      }
      
      const data = await response.json();
      
      setSuccess(true);
      
      // Redirect to the product type list after a short delay if creating new product type
      if (!isEditing) {
        setTimeout(() => {
          window.location.href = '/admin/resources/ProductType';
        }, 1500);
      }
    } catch (e) {
      console.error('Error saving product type:', e);
      setError(e.message || 'Failed to save product type. Please try again.');
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
      <H3 mb="xl">{isEditing ? 'Edit Product Type' : 'Create New Product Type'}</H3>
      
      {error && (
        <MessageBox mb="xl" message={error} variant="danger" />
      )}
      
      {success && (
        <MessageBox mb="xl" message="Product type saved successfully!" variant="success" />
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
        </FormGroup>
      </Box>
      
      <Box>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Product Type'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductTypeForm; 