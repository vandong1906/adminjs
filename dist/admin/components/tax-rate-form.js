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
const TaxRateForm = (props) => {
    const { record, resource, action } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        tax_class_id: '',
        tax_zone_id: '',
        name: '',
        priority: 0,
        is_active: true,
    });
    const [taxClasses, setTaxClasses] = useState([]);
    const [taxZones, setTaxZones] = useState([]);
    const api = new ApiClient();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [taxClassesResponse, taxZonesResponse] = await Promise.all([
                    api.resourceAction({ resourceId: 'TaxClass', actionName: 'list' }),
                    api.resourceAction({ resourceId: 'TaxZone', actionName: 'list' })
                ]);
                setTaxClasses(taxClassesResponse.data.records || []);
                setTaxZones(taxZonesResponse.data.records || []);
                if (isEditing) {
                    setFormData({
                        tax_class_id: record.params.tax_class_id || '',
                        tax_zone_id: record.params.tax_zone_id || '',
                        name: record.params.name || '',
                        priority: record.params.priority || 0,
                        is_active: record.params.is_active !== false,
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
        const { name, value, type, checked } = e.target;
        if (name === 'priority') {
            setFormData(prev => ({
                ...prev,
                [name]: parseInt(value) || 0
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
                ? `/admin/api/tax-rates/${record.id}`
                : '/admin/api/tax-rates';
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
                throw new Error(errorData.error || 'An error occurred while saving the tax rate');
            }
            const data = await response.json();
            setSuccess(true);
            if (!isEditing) {
                setTimeout(() => {
                    window.location.href = '/admin/resources/TaxRate';
                }, 1500);
            }
        }
        catch (e) {
            console.error('Error saving tax rate:', e);
            setError(e.message || 'Failed to save tax rate. Please try again.');
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
        React.createElement(H3, { mb: "xl" }, isEditing ? 'Edit Tax Rate' : 'Create New Tax Rate'),
        error && (React.createElement(MessageBox, { mb: "xl", message: error, variant: "danger" })),
        success && (React.createElement(MessageBox, { mb: "xl", message: "Tax rate saved successfully!", variant: "success" })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Name"),
                React.createElement(TextInput, { name: "name", value: formData.name, onChange: handleInputChange, required: true })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Tax Class"),
                React.createElement(StatusSelect, { name: "tax_class_id", value: formData.tax_class_id, onChange: handleInputChange, required: true },
                    React.createElement("option", { value: "" }, "Select Tax Class"),
                    taxClasses.map(taxClass => (React.createElement("option", { key: taxClass.id, value: taxClass.id }, taxClass.params.name))))),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Tax Zone"),
                React.createElement(StatusSelect, { name: "tax_zone_id", value: formData.tax_zone_id, onChange: handleInputChange, required: true },
                    React.createElement("option", { value: "" }, "Select Tax Zone"),
                    taxZones.map(taxZone => (React.createElement("option", { key: taxZone.id, value: taxZone.id }, taxZone.params.name))))),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Priority"),
                React.createElement(TextInput, { type: "number", name: "priority", value: formData.priority, onChange: handleInputChange, required: true }),
                React.createElement(Text, { mt: "sm", as: "p", fontSize: "sm", color: "grey80" }, "Higher priority tax rates will be applied first.")),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Active"),
                React.createElement(Box, { mt: "default" },
                    React.createElement(Switch, { name: "is_active", checked: formData.is_active, onChange: handleInputChange })))),
        React.createElement(Box, null,
            React.createElement(Button, { variant: "primary", type: "submit", disabled: loading }, loading ? 'Saving...' : 'Save Tax Rate'))));
};
export default TaxRateForm;
