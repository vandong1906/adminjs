import React, { useState, useEffect } from 'react';
import { Box, H3, Label, Text, Button, MessageBox, Loader, FormGroup, TextArea } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import styled from 'styled-components';
import AttributeEditor from './attribute-editor.js';

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

const StatusSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  
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

const ProductForm = (props) => {
  const { record, resource, action } = props;
  const isEditing = record && record.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    product_type_id: '',
    status: 'draft',
    attribute_data: {},
    createDefaultVariant: true,
  });
  const [productTypes, setProductTypes] = useState([]);
  const api = new ApiClient();

  // Fetch product types on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Only fetch product types which should definitely exist
        const productTypesResponse = await api.resourceAction({ resourceId: 'ProductType', actionName: 'list' });
        setProductTypes(productTypesResponse.data.records || []);
        
        // If editing, load the product data
        if (isEditing) {
          try {
            const productResponse = await fetch(`/admin/api/products/${record.id}`);
            if (productResponse.ok) {
              const productData = await productResponse.json();
              setFormData({
                product_type_id: productData.product_type_id || '',
                status: productData.status || 'draft',
                attribute_data: productData.attribute_data || {},
                createDefaultVariant: false,
              });
            }
          } catch (e) {
            console.error('Error loading product data:', e);
          }
        }
      } catch (e) {
        console.error('Error loading form data:', e);
        setError('Failed to load form data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isEditing, record]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleAttributeChange = (propertyName, value) => {
    setFormData(prev => ({
      ...prev,
      [propertyName]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const apiEndpoint = isEditing 
        ? `/admin/api/products/${record.id}`
        : '/admin/api/products';
      
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
        throw new Error(errorData.error || 'An error occurred while saving the product');
      }
      
      const data = await response.json();
      
      setSuccess(true);
      
      // Redirect to the product list after a short delay if creating new product
      if (!isEditing) {
        setTimeout(() => {
          window.location.href = '/admin/resources/Product';
        }, 1500);
      }
    } catch (e) {
      console.error('Error saving product:', e);
      setError(e.message || 'Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !formData.product_type_id) {
    return (
      <Box>
        <Loader />
        <Text mt="default">Loading...</Text>
      </Box>
    );
  }
  
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <H3 mb="xl">{isEditing ? 'Edit Product' : 'Create New Product'}</H3>
      
      {error && (
        <MessageBox mb="xl" message={error} variant="danger" />
      )}
      
      {success && (
        <MessageBox mb="xl" message="Product saved successfully!" variant="success" />
      )}
      
      <Box mb="xl">
        <FormGroup>
          <Label required>Product Type</Label>
          <StatusSelect
            name="product_type_id"
            value={formData.product_type_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Product Type</option>
            {productTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.params.name}
              </option>
            ))}
          </StatusSelect>
        </FormGroup>
        
        <FormGroup>
          <Label required>Status</Label>
          <StatusSelect
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </StatusSelect>
        </FormGroup>
        
        {!isEditing && (
          <FormGroup>
            <Label>Create Default Variant</Label>
            <Box display="flex" alignItems="center">
              <Switch
                name="createDefaultVariant"
                checked={formData.createDefaultVariant}
                onChange={handleInputChange}
              />
              <Text ml="default">
                {formData.createDefaultVariant ? 'Yes' : 'No'}
              </Text>
            </Box>
            <Text mt="sm" variant="sm" color="grey100">
              This will create a default variant for this product automatically.
            </Text>
          </FormGroup>
        )}
        
        <FormGroup>
          <Label>Product Attributes</Label>
          <AttributeEditor
            record={{
              params: {
                attribute_data: formData.attribute_data
              },
              populated: {},
              errors: {},
              recordActions: [],
              bulkActions: [],
              id: isEditing ? record?.id : '',
              title: '',
              baseError: null
            }}
            onChange={(propertyName, value) => handleAttributeChange(propertyName, value)}
          />
        </FormGroup>
      </Box>
      
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Product'}
      </Button>
    </Box>
  );
};

export default ProductForm; 