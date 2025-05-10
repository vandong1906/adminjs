import React, { useState, useEffect } from 'react';
import { Box, H3, Label, Text, Button, MessageBox, Loader, FormGroup, TextArea } from '@adminjs/design-system';
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

const OrderForm = (props) => {
  const { record, resource, action } = props;
  const isEditing = record && record.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: '',
    channel_id: '',
    status: 'pending',
    reference: '',
    customer_reference: '',
    sub_total: 0,
    discount_total: 0,
    shipping_total: 0,
    tax_total: 0,
    total: 0,
    notes: '',
    currency_code: 'USD',
    compare_currency_code: '',
    exchange_rate: 1,
    meta: {},
  });
  const [customers, setCustomers] = useState([]);
  const [channels, setChannels] = useState([]);
  const api = new ApiClient();

  // Fetch customers and channels on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch each resource individually with error handling
        try {
          const customersResponse = await api.resourceAction({ resourceId: 'lunar_customers', actionName: 'list' });
          setCustomers(customersResponse.data.records || []);
        } catch (error) {
          console.warn('Error fetching customers:', error);
          setCustomers([]);
        }
        
        try {
          const channelsResponse = await api.resourceAction({ resourceId: 'lunar_channels', actionName: 'list' });
          setChannels(channelsResponse.data.records || []);
        } catch (error) {
          console.warn('Error fetching channels:', error);
          setChannels([]);
        }
        
        // If editing, load the order data
        if (isEditing) {
          setFormData({
            customer_id: record.params.customer_id || '',
            channel_id: record.params.channel_id || '',
            status: record.params.status || 'pending',
            reference: record.params.reference || '',
            customer_reference: record.params.customer_reference || '',
            sub_total: record.params.sub_total || 0,
            discount_total: record.params.discount_total || 0,
            shipping_total: record.params.shipping_total || 0,
            tax_total: record.params.tax_total || 0,
            total: record.params.total || 0,
            notes: record.params.notes || '',
            currency_code: record.params.currency_code || 'USD',
            compare_currency_code: record.params.compare_currency_code || '',
            exchange_rate: record.params.exchange_rate || 1,
            meta: record.params.meta || {},
          });
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
    const { name, value, type } = e.target;
    
    // Handle numeric fields
    if (name === 'sub_total' || name === 'discount_total' || name === 'shipping_total' || 
        name === 'tax_total' || name === 'total' || name === 'exchange_rate') {
      const numValue = type === 'number' ? parseFloat(value) : value;
      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const calculateTotal = () => {
    // Convert numeric values safely using Number() instead of parseFloat
    const subTotal = Number(formData.sub_total) || 0;
    const discountTotal = Number(formData.discount_total) || 0;
    const shippingTotal = Number(formData.shipping_total) || 0;
    const taxTotal = Number(formData.tax_total) || 0;
    
    const total = subTotal - discountTotal + shippingTotal + taxTotal;
    
    setFormData(prev => ({
      ...prev,
      total
    }));
  };
  
  useEffect(() => {
    calculateTotal();
  }, [formData.sub_total, formData.discount_total, formData.shipping_total, formData.tax_total]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const apiEndpoint = isEditing 
        ? `/admin/api/resources/lunar_orders/records/${record.id}`
        : '/admin/api/resources/lunar_orders/actions/new';
      
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
        throw new Error(errorData.error || 'An error occurred while saving the order');
      }
      
      const data = await response.json();
      
      setSuccess(true);
      
      // Redirect to the order list after a short delay if creating new order
      if (!isEditing) {
        setTimeout(() => {
          window.location.href = '/admin/resources/lunar_orders';
        }, 1500);
      }
    } catch (e) {
      console.error('Error saving order:', e);
      setError(e.message || 'Failed to save order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !formData.status) {
    return (
      <Box>
        <Loader />
        <Text mt="default">Loading...</Text>
      </Box>
    );
  }
  
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <H3 mb="xl">{isEditing ? 'Edit Order' : 'Create New Order'}</H3>
      
      {error && (
        <MessageBox mb="xl" message={error} variant="danger" />
      )}
      
      {success && (
        <MessageBox mb="xl" message="Order saved successfully!" variant="success" />
      )}
      
      <Box mb="xl">
        <FormGroup>
          <Label>Customer</Label>
          <StatusSelect
            name="customer_id"
            value={formData.customer_id}
            onChange={handleInputChange}
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.params.first_name} {customer.params.last_name}
              </option>
            ))}
          </StatusSelect>
        </FormGroup>
        
        <FormGroup>
          <Label>Channel</Label>
          <StatusSelect
            name="channel_id"
            value={formData.channel_id}
            onChange={handleInputChange}
          >
            <option value="">Select Channel</option>
            {channels.map(channel => (
              <option key={channel.id} value={channel.id}>
                {channel.params.name}
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </StatusSelect>
        </FormGroup>
        
        <FormGroup>
          <Label required>Reference</Label>
          <TextInput
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Customer Reference</Label>
          <TextInput
            name="customer_reference"
            value={formData.customer_reference}
            onChange={handleInputChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label required>Sub Total</Label>
          <TextInput
            type="number"
            name="sub_total"
            value={formData.sub_total}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label required>Discount Total</Label>
          <TextInput
            type="number"
            name="discount_total"
            value={formData.discount_total}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label required>Shipping Total</Label>
          <TextInput
            type="number"
            name="shipping_total"
            value={formData.shipping_total}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label required>Tax Total</Label>
          <TextInput
            type="number"
            name="tax_total"
            value={formData.tax_total}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label required>Total</Label>
          <TextInput
            type="number"
            name="total"
            value={formData.total}
            onChange={handleInputChange}
            disabled
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Notes</Label>
          <TextArea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label required>Currency Code</Label>
          <TextInput
            name="currency_code"
            value={formData.currency_code}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Compare Currency Code</Label>
          <TextInput
            name="compare_currency_code"
            value={formData.compare_currency_code}
            onChange={handleInputChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label required>Exchange Rate</Label>
          <TextInput
            type="number"
            name="exchange_rate"
            value={formData.exchange_rate}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
      </Box>
      
      <Box>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Order'}
        </Button>
      </Box>
    </Box>
  );
};

export default OrderForm; 