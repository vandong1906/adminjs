import React, { useState, useEffect } from 'react';
import { Box, H3, Label, Text, Button, MessageBox, Loader, FormGroup } from '@adminjs/design-system';
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
const CartForm = (props) => {
    const { record, resource, action } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        user_id: '',
        customer_id: '',
        merged_id: '',
        channel_id: '',
        currency_id: '',
        coupon_code: '',
        completed_at: null,
        meta: {},
    });
    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);
    const [channels, setChannels] = useState([]);
    const [currencies, setCurrencies] = useState([]);
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
                    const usersResponse = await api.resourceAction({ resourceId: 'users', actionName: 'list' });
                    setUsers(usersResponse.data.records || []);
                }
                catch (error) {
                    console.warn('Error fetching users:', error);
                    setUsers([]);
                }
                try {
                    const channelsResponse = await api.resourceAction({ resourceId: 'lunar_channels', actionName: 'list' });
                    setChannels(channelsResponse.data.records || []);
                }
                catch (error) {
                    console.warn('Error fetching channels:', error);
                    setChannels([]);
                }
                try {
                    const currenciesResponse = await api.resourceAction({ resourceId: 'lunar_currencies', actionName: 'list' });
                    setCurrencies(currenciesResponse.data.records || []);
                }
                catch (error) {
                    console.warn('Error fetching currencies:', error);
                    setCurrencies([]);
                }
                if (isEditing) {
                    setFormData({
                        user_id: record.params.user_id || '',
                        customer_id: record.params.customer_id || '',
                        merged_id: record.params.merged_id || '',
                        channel_id: record.params.channel_id || '',
                        currency_id: record.params.currency_id || '',
                        coupon_code: record.params.coupon_code || '',
                        completed_at: record.params.completed_at || null,
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
                ? `/admin/api/resources/lunar_carts/records/${record.id}`
                : '/admin/api/resources/lunar_carts/actions/new';
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
                throw new Error(errorData.error || 'An error occurred while saving the cart');
            }
            const data = await response.json();
            setSuccess(true);
            if (!isEditing) {
                setTimeout(() => {
                    window.location.href = '/admin/resources/lunar_carts';
                }, 1500);
            }
        }
        catch (e) {
            console.error('Error saving cart:', e);
            setError(e.message || 'Failed to save cart. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    if (loading && !formData.customer_id && isEditing) {
        return (React.createElement(Box, null,
            React.createElement(Loader, null),
            React.createElement(Text, { mt: "default" }, "Loading...")));
    }
    return (React.createElement(Box, { as: "form", onSubmit: handleSubmit },
        React.createElement(H3, { mb: "xl" }, isEditing ? 'Edit Cart' : 'Create New Cart'),
        error && (React.createElement(MessageBox, { mb: "xl", message: error, variant: "danger" })),
        success && (React.createElement(MessageBox, { mb: "xl", message: "Cart saved successfully!", variant: "success" })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "User"),
                React.createElement(StatusSelect, { name: "user_id", value: formData.user_id, onChange: handleInputChange },
                    React.createElement("option", { value: "" }, "Select User"),
                    users.map(user => (React.createElement("option", { key: user.id, value: user.id }, user.params.email))))),
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
                React.createElement(Label, null, "Currency"),
                React.createElement(StatusSelect, { name: "currency_id", value: formData.currency_id, onChange: handleInputChange },
                    React.createElement("option", { value: "" }, "Select Currency"),
                    currencies.map(currency => (React.createElement("option", { key: currency.id, value: currency.id },
                        currency.params.code,
                        " (",
                        currency.params.name,
                        ")"))))),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Coupon Code"),
                React.createElement(TextInput, { name: "coupon_code", value: formData.coupon_code, onChange: handleInputChange })),
            isEditing && (React.createElement(FormGroup, null,
                React.createElement(Label, null, "Completed At"),
                React.createElement(TextInput, { type: "datetime-local", name: "completed_at", value: formData.completed_at ? new Date(formData.completed_at).toISOString().slice(0, 16) : '', onChange: handleInputChange })))),
        React.createElement(Box, null,
            React.createElement(Button, { variant: "primary", type: "submit", disabled: loading }, loading ? 'Saving...' : 'Save Cart'))));
};
export default CartForm;
