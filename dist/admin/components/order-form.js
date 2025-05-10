import React, { useState, useEffect } from 'react';
import { Box, H3, Label, Text, Button, MessageBox, Loader, FormGroup, TextArea } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import styled from 'styled-components';
const TextInput = styled.input `
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
const StatusSelect = styled.select `
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                try {
                    const customersResponse = await api.resourceAction({ resourceId: 'lunar_customers', actionName: 'list' });
                    setCustomers(customersResponse.data.records || []);
                }
                catch (error) {
                    console.warn('Error fetching customers:', error);
                    setCustomers([]);
                }
                try {
                    const channelsResponse = await api.resourceAction({ resourceId: 'lunar_channels', actionName: 'list' });
                    setChannels(channelsResponse.data.records || []);
                }
                catch (error) {
                    console.warn('Error fetching channels:', error);
                    setChannels([]);
                }
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
            }
            catch (e) {
                console.error('Error loading form data:', e);
                setError('Failed to load form data. Please try again.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [isEditing, record]);
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        if (name === 'sub_total' || name === 'discount_total' || name === 'shipping_total' ||
            name === 'tax_total' || name === 'total' || name === 'exchange_rate') {
            const numValue = type === 'number' ? parseFloat(value) : value;
            setFormData(prev => ({
                ...prev,
                [name]: numValue
            }));
        }
        else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    const calculateTotal = () => {
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
            if (!isEditing) {
                setTimeout(() => {
                    window.location.href = '/admin/resources/lunar_orders';
                }, 1500);
            }
        }
        catch (e) {
            console.error('Error saving order:', e);
            setError(e.message || 'Failed to save order. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    if (loading && !formData.status) {
        return (React.createElement(Box, null,
            React.createElement(Loader, null),
            React.createElement(Text, { mt: "default" }, "Loading...")));
    }
    return (React.createElement(Box, { as: "form", onSubmit: handleSubmit },
        React.createElement(H3, { mb: "xl" }, isEditing ? 'Edit Order' : 'Create New Order'),
        error && (React.createElement(MessageBox, { mb: "xl", message: error, variant: "danger" })),
        success && (React.createElement(MessageBox, { mb: "xl", message: "Order saved successfully!", variant: "success" })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Customer"),
                React.createElement(StatusSelect, { name: "customer_id", value: formData.customer_id, onChange: handleInputChange },
                    React.createElement("option", { value: "" }, "Select Customer"),
                    customers.map(customer => (React.createElement("option", { key: customer.id, value: customer.id },
                        customer.params.first_name,
                        " ",
                        customer.params.last_name))))),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Channel"),
                React.createElement(StatusSelect, { name: "channel_id", value: formData.channel_id, onChange: handleInputChange },
                    React.createElement("option", { value: "" }, "Select Channel"),
                    channels.map(channel => (React.createElement("option", { key: channel.id, value: channel.id }, channel.params.name))))),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Status"),
                React.createElement(StatusSelect, { name: "status", value: formData.status, onChange: handleInputChange, required: true },
                    React.createElement("option", { value: "pending" }, "Pending"),
                    React.createElement("option", { value: "processing" }, "Processing"),
                    React.createElement("option", { value: "completed" }, "Completed"),
                    React.createElement("option", { value: "cancelled" }, "Cancelled"),
                    React.createElement("option", { value: "refunded" }, "Refunded"))),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Reference"),
                React.createElement(TextInput, { name: "reference", value: formData.reference, onChange: handleInputChange, required: true })),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Customer Reference"),
                React.createElement(TextInput, { name: "customer_reference", value: formData.customer_reference, onChange: handleInputChange })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Sub Total"),
                React.createElement(TextInput, { type: "number", name: "sub_total", value: formData.sub_total, onChange: handleInputChange, required: true })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Discount Total"),
                React.createElement(TextInput, { type: "number", name: "discount_total", value: formData.discount_total, onChange: handleInputChange, required: true })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Shipping Total"),
                React.createElement(TextInput, { type: "number", name: "shipping_total", value: formData.shipping_total, onChange: handleInputChange, required: true })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Tax Total"),
                React.createElement(TextInput, { type: "number", name: "tax_total", value: formData.tax_total, onChange: handleInputChange, required: true })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Total"),
                React.createElement(TextInput, { type: "number", name: "total", value: formData.total, onChange: handleInputChange, disabled: true, required: true })),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Notes"),
                React.createElement(TextArea, { name: "notes", value: formData.notes, onChange: handleInputChange })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Currency Code"),
                React.createElement(TextInput, { name: "currency_code", value: formData.currency_code, onChange: handleInputChange, required: true })),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Compare Currency Code"),
                React.createElement(TextInput, { name: "compare_currency_code", value: formData.compare_currency_code, onChange: handleInputChange })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Exchange Rate"),
                React.createElement(TextInput, { type: "number", name: "exchange_rate", value: formData.exchange_rate, onChange: handleInputChange, required: true }))),
        React.createElement(Box, null,
            React.createElement(Button, { variant: "primary", type: "submit", disabled: loading }, loading ? 'Saving...' : 'Save Order'))));
};
export default OrderForm;
