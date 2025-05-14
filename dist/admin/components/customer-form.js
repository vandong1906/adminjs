import React, { useState, useEffect } from 'react';
import { Box, Button, FormGroup, Label, Input, CheckBox, Section, Text, Loader, MessageBox, } from '@adminjs/design-system';
import { useRecord, useTranslation } from 'adminjs';
const CustomerForm = () => {
    const { record, handleChange, submit } = useRecord();
    const { translateButton } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [customerGroups, setCustomerGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    useEffect(() => {
        const fetchCustomerGroups = async () => {
            try {
                const response = await fetch('/admin/api/customer-groups');
                if (response.ok) {
                    const data = await response.json();
                    setCustomerGroups(data);
                }
            }
            catch (error) {
                console.error('Error fetching customer groups:', error);
            }
        };
        const fetchCustomerData = async () => {
            if (record.id) {
                try {
                    const response = await fetch(`/admin/api/customers/${record.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.customerGroups && Array.isArray(data.customerGroups)) {
                            setSelectedGroups(data.customerGroups.map((group) => group.id));
                        }
                    }
                }
                catch (error) {
                    console.error('Error fetching customer data:', error);
                }
            }
        };
        fetchCustomerGroups();
        fetchCustomerData();
        console.log('Customer groups:', customerGroups);
        console.log('Selected groups:', selectedGroups);
    }, [record.id]);
    const handleGroupsChange = (event) => {
        const { value } = event.target;
        const numValue = parseInt(value, 10);
        if (selectedGroups.includes(numValue)) {
            setSelectedGroups(selectedGroups.filter(id => id !== numValue));
        }
        else {
            setSelectedGroups([...selectedGroups, numValue]);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const formData = {
                title: record.params.title,
                first_name: record.params.first_name,
                last_name: record.params.last_name,
                email: record.params.email,
                phone: record.params.phone,
                company_name: record.params.company_name,
                vat_no: record.params.vat_no,
                group_ids: selectedGroups,
                meta: record.params.meta || {},
            };
            let response;
            if (record.id) {
                response = await fetch(`/admin/api/customers/${record.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
            else {
                response = await fetch('/admin/api/customers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
            if (response.ok) {
                const data = await response.json();
                setMessage({
                    type: 'success',
                    text: record.id
                        ? 'Customer updated successfully'
                        : 'Customer created successfully'
                });
                if (!record.id) {
                    window.location.href = `/admin/resources/Customer/records/${data.id}/edit`;
                }
                else {
                    submit().then(() => {
                        window.location.reload();
                    });
                }
            }
            else {
                const errorData = await response.json();
                setMessage({ type: 'danger', text: errorData.error || 'An error occurred' });
            }
        }
        catch (error) {
            console.error('Error saving customer:', error);
            setMessage({ type: 'danger', text: 'An error occurred while saving customer' });
        }
        finally {
            setLoading(false);
        }
    };
    const handleAnonymize = async () => {
        if (!record.id)
            return;
        if (!window.confirm('Are you sure you want to anonymize this customer? This action cannot be undone.')) {
            return;
        }
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const response = await fetch(`/admin/api/customers/${record.id}/anonymize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                setMessage({ type: 'success', text: 'Customer anonymized successfully' });
                window.location.reload();
            }
            else {
                const errorData = await response.json();
                setMessage({ type: 'danger', text: errorData.error || 'An error occurred' });
            }
        }
        catch (error) {
            console.error('Error anonymizing customer:', error);
            setMessage({ type: 'danger', text: 'An error occurred while anonymizing customer' });
        }
        finally {
            setLoading(false);
        }
    };
    return (React.createElement(Box, { as: "form", onSubmit: handleSubmit },
        message.text && (React.createElement(MessageBox, { style: { marginBottom: '1rem' }, variant: message.type, message: message.text })),
        React.createElement(Section, null,
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Title"),
                React.createElement("select", { className: "adminjs-select", value: record.params.title || '', onChange: (e) => handleChange('title', e.target.value) },
                    React.createElement("option", { value: "" }, "Select..."),
                    React.createElement("option", { value: "Mr" }, "Mr"),
                    React.createElement("option", { value: "Mrs" }, "Mrs"),
                    React.createElement("option", { value: "Ms" }, "Ms"),
                    React.createElement("option", { value: "Dr" }, "Dr"))),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "First Name"),
                React.createElement(Input, { required: true, value: record.params.first_name || '', onChange: (e) => handleChange('first_name', e.target.value) })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Last Name"),
                React.createElement(Input, { required: true, value: record.params.last_name || '', onChange: (e) => handleChange('last_name', e.target.value) })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Email Address"),
                React.createElement(Input, { required: true, type: "email", value: record.params.email || '', onChange: (e) => handleChange('email', e.target.value) })),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Phone"),
                React.createElement(Input, { value: record.params.phone || '', onChange: (e) => handleChange('phone', e.target.value) }))),
        React.createElement(Section, { title: "Company Information" },
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Company Name"),
                React.createElement(Input, { value: record.params.company_name || '', onChange: (e) => handleChange('company_name', e.target.value) })),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "VAT Number"),
                React.createElement(Input, { value: record.params.vat_no || '', onChange: (e) => handleChange('vat_no', e.target.value) }))),
        React.createElement(Section, { title: "Customer Groups" }, customerGroups.length > 0 ? (React.createElement(FormGroup, null, customerGroups.map(group => (React.createElement(Box, { mb: "default", key: group.id },
            React.createElement(CheckBox, { id: `group-${group.id}`, checked: selectedGroups.includes(group.id), onChange: handleGroupsChange, value: group.id.toString() }),
            React.createElement(Label, { inline: true, htmlFor: `group-${group.id}` }, group.name)))))) : (React.createElement(Text, null, "No customer groups available"))),
        React.createElement(Box, { mt: "xl" },
            React.createElement(Button, { variant: "primary", type: "submit", disabled: loading }, loading ? React.createElement(Loader, null) : (record.id ? 'Update Customer' : 'Create Customer')),
            record.id && (React.createElement(Button, { ml: "default", variant: "danger", type: "button", onClick: handleAnonymize, disabled: loading }, "Anonymize Customer")))));
};
export default CustomerForm;
