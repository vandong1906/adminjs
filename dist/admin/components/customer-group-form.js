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
const Switch = styled.input.attrs({ type: 'checkbox' }) `
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
const CustomerGroupForm = (props) => {
    const { record, resource, action } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        handle: '',
        is_default: false,
        description: '',
    });
    const api = new ApiClient();
    useEffect(() => {
        if (isEditing) {
            setFormData({
                name: record.params.name || '',
                handle: record.params.handle || '',
                is_default: record.params.is_default === true,
                description: record.params.description || '',
            });
        }
    }, [isEditing, record]);
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'name' && !isEditing) {
            const handle = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: value,
                handle,
            }));
        }
        else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            const apiEndpoint = isEditing
                ? `/admin/api/customer-groups/${record.id}`
                : '/admin/api/customer-groups';
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
                throw new Error(errorData.error || 'An error occurred while saving the customer group');
            }
            const data = await response.json();
            setSuccess(true);
            if (!isEditing) {
                setTimeout(() => {
                    window.location.href = '/admin/resources/CustomerGroup';
                }, 1500);
            }
        }
        catch (e) {
            console.error('Error saving customer group:', e);
            setError(e.message || 'Failed to save customer group. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    if (loading && !formData.name && isEditing) {
        return (React.createElement(Box, null,
            React.createElement(Loader, null),
            React.createElement(Text, { mt: "default" }, "Loading...")));
    }
    return (React.createElement(Box, { as: "form", onSubmit: handleSubmit },
        React.createElement(H3, { mb: "xl" }, isEditing ? 'Edit Customer Group' : 'Create New Customer Group'),
        error && (React.createElement(MessageBox, { mb: "xl", message: error, variant: "danger" })),
        success && (React.createElement(MessageBox, { mb: "xl", message: "Customer group saved successfully!", variant: "success" })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Group Name"),
                React.createElement(TextInput, { name: "name", value: formData.name, onChange: handleInputChange, required: true })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Handle"),
                React.createElement(TextInput, { name: "handle", value: formData.handle, onChange: handleInputChange, required: true }),
                React.createElement(Text, { mt: "sm", as: "p", fontSize: "sm", color: "grey80" }, "Used in URLs and API calls. Auto-generated from name if left empty.")),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Description"),
                React.createElement(TextArea, { name: "description", value: formData.description, onChange: handleInputChange })),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Default Group"),
                React.createElement(Box, { mt: "default" },
                    React.createElement(Switch, { name: "is_default", checked: formData.is_default, onChange: handleInputChange }),
                    React.createElement(Text, { mt: "sm", as: "p", fontSize: "sm", color: "grey80" }, "If enabled, new customers will automatically be assigned to this group.")))),
        React.createElement(Box, null,
            React.createElement(Button, { variant: "primary", type: "submit", disabled: loading }, loading ? 'Saving...' : 'Save Customer Group'))));
};
export default CustomerGroupForm;
