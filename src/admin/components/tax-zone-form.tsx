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

const TaxZoneForm = (props) => {
  const { record, resource, action } = props;
  const isEditing = record && record.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    zone_type: 'country',
    price_display: 'tax_inclusive',
    active: true,
    default: false,
  });
  const api = new ApiClient();

  // Load tax zone data if editing
  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: record.params.name || '',
        zone_type: record.params.zone_type || 'country',
        price_display: record.params.price_display || 'tax_inclusive',
        active: record.params.active !== false,
        default: record.params.default === true,
      });
    }
  }, [isEditing, record]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const apiEndpoint = isEditing 
        ? `/admin/api/tax-zones/${record.id}`
        : '/admin/api/tax-zones';
      
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
        throw new Error(errorData.error || 'An error occurred while saving the tax zone');
      }
      
      const data = await response.json();
      
      setSuccess(true);
      
      // Redirect to the tax zone list after a short delay if creating new tax zone
      if (!isEditing) {
        setTimeout(() => {
          window.location.href = '/admin/resources/TaxZone';
        }, 1500);
      }
    } catch (e) {
      console.error('Error saving tax zone:', e);
      setError(e.message || 'Failed to save tax zone. Please try again.');
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
      <H3 mb="xl">{isEditing ? 'Edit Tax Zone' : 'Create New Tax Zone'}</H3>
      
      {error && (
        <MessageBox mb="xl" message={error} variant="danger" />
      )}
      
      {success && (
        <MessageBox mb="xl" message="Tax zone saved successfully!" variant="success" />
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
            Examples: EU Zone, UK, North America, etc.
          </Text>
        </FormGroup>
        
        <FormGroup>
          <Label required>Zone Type</Label>
          <StatusSelect
            name="zone_type"
            value={formData.zone_type}
            onChange={handleInputChange}
            required
          >
            <option value="country">Country</option>
            <option value="state">State/Region</option>
            <option value="postcode">Postcode/ZIP</option>
            <option value="customer_group">Customer Group</option>
          </StatusSelect>
          <Text mt="sm" as="p" fontSize="sm" color="grey80">
            Determines how this zone will be applied.
          </Text>
        </FormGroup>
        
        <FormGroup>
          <Label required>Price Display</Label>
          <StatusSelect
            name="price_display"
            value={formData.price_display}
            onChange={handleInputChange}
            required
          >
            <option value="tax_inclusive">Tax Inclusive</option>
            <option value="tax_exclusive">Tax Exclusive</option>
          </StatusSelect>
          <Text mt="sm" as="p" fontSize="sm" color="grey80">
            How should prices be displayed in this zone.
          </Text>
        </FormGroup>
        
        <FormGroup>
          <Label>Active</Label>
          <Box mt="default">
            <Switch
              name="active"
              checked={formData.active}
              onChange={handleInputChange}
            />
          </Box>
        </FormGroup>
        
        <FormGroup>
          <Label>Default Zone</Label>
          <Box mt="default">
            <Switch
              name="default"
              checked={formData.default}
              onChange={handleInputChange}
            />
            <Text mt="sm" as="p" fontSize="sm" color="grey80">
              If enabled, this zone will be used as the default when no other zone matches.
            </Text>
          </Box>
        </FormGroup>
      </Box>
      
      <Box>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Tax Zone'}
        </Button>
      </Box>
    </Box>
  );
};

export default TaxZoneForm; 