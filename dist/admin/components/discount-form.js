import React, { useState, useEffect } from 'react';
import { Box, Button, FormGroup, Label, Input, CheckBox, Section, Text, Loader, MessageBox, DatePicker, } from '@adminjs/design-system';
import { useRecord, useTranslation } from 'adminjs';
const DiscountForm = () => {
    const { record, handleChange, submit } = useRecord();
    const { translateButton } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [products, setProducts] = useState([]);
    const [collections, setCollections] = useState([]);
    const [customerGroups, setCustomerGroups] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [selectedCustomerGroups, setSelectedCustomerGroups] = useState([]);
    const [discountType, setDiscountType] = useState('percentage');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [isActive, setIsActive] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetch('/admin/api/products?limit=100');
                if (productsResponse.ok) {
                    const productsData = await productsResponse.json();
                    setProducts(productsData.products || []);
                }
                const collectionsResponse = await fetch('/admin/api/collections?limit=100');
                if (collectionsResponse.ok) {
                    const collectionsData = await collectionsResponse.json();
                    setCollections(collectionsData.collections || []);
                }
                const groupsResponse = await fetch('/admin/api/customer-groups');
                if (groupsResponse.ok) {
                    const groupsData = await groupsResponse.json();
                    setCustomerGroups(groupsData.groups || []);
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchDiscountData = async () => {
            if (record.id) {
                try {
                    setDiscountType(record.params.type || 'percentage');
                    setIsActive(record.params.is_active !== 'false');
                    if (record.params.starts_at) {
                        setStartDate(new Date(record.params.starts_at));
                    }
                    if (record.params.ends_at) {
                        setEndDate(new Date(record.params.ends_at));
                    }
                    const response = await fetch(`/admin/api/discounts/${record.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.products && Array.isArray(data.products)) {
                            setSelectedProducts(data.products.map((product) => product.id));
                        }
                        if (data.collections && Array.isArray(data.collections)) {
                            setSelectedCollections(data.collections.map((collection) => collection.id));
                        }
                        if (data.customerGroups && Array.isArray(data.customerGroups)) {
                            setSelectedCustomerGroups(data.customerGroups.map((group) => group.id));
                        }
                    }
                }
                catch (error) {
                    console.error('Error fetching discount data:', error);
                }
            }
        };
        fetchData();
        fetchDiscountData();
    }, [record.id]);
    const handleProductChange = (event) => {
        const { value } = event.target;
        const numValue = parseInt(value, 10);
        if (selectedProducts.includes(numValue)) {
            setSelectedProducts(selectedProducts.filter(id => id !== numValue));
        }
        else {
            setSelectedProducts([...selectedProducts, numValue]);
        }
    };
    const handleCollectionChange = (event) => {
        const { value } = event.target;
        const numValue = parseInt(value, 10);
        if (selectedCollections.includes(numValue)) {
            setSelectedCollections(selectedCollections.filter(id => id !== numValue));
        }
        else {
            setSelectedCollections([...selectedCollections, numValue]);
        }
    };
    const handleCustomerGroupChange = (event) => {
        const { value } = event.target;
        const numValue = parseInt(value, 10);
        if (selectedCustomerGroups.includes(numValue)) {
            setSelectedCustomerGroups(selectedCustomerGroups.filter(id => id !== numValue));
        }
        else {
            setSelectedCustomerGroups([...selectedCustomerGroups, numValue]);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const formattedStartDate = startDate ? startDate.toISOString() : new Date().toISOString();
            const formattedEndDate = endDate ? endDate.toISOString() : null;
            const formData = {
                name: record.params.name,
                code: record.params.code,
                type: discountType,
                value: parseFloat(record.params.value || '0'),
                min_order_value: parseFloat(record.params.min_order_value || '0'),
                max_uses: record.params.max_uses ? parseInt(record.params.max_uses, 10) : null,
                starts_at: formattedStartDate,
                ends_at: formattedEndDate,
                is_active: isActive,
                product_ids: selectedProducts,
                collection_ids: selectedCollections,
                customer_group_ids: selectedCustomerGroups,
            };
            let response;
            if (record.id) {
                response = await fetch(`/admin/api/discounts/${record.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
            else {
                response = await fetch('/admin/api/discounts', {
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
                        ? 'Discount updated successfully'
                        : 'Discount created successfully'
                });
                if (!record.id) {
                    window.location.href = `/admin/resources/Discount/records/${data.id}/edit`;
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
            console.error('Error saving discount:', error);
            setMessage({ type: 'danger', text: 'An error occurred while saving discount' });
        }
        finally {
            setLoading(false);
        }
    };
    const handleStartDateChange = (value) => {
        if (typeof value === 'string') {
            setStartDate(new Date(value));
        }
        else {
            setStartDate(value);
        }
    };
    const handleEndDateChange = (value) => {
        if (value === null) {
            setEndDate(null);
            return;
        }
        if (typeof value === 'string') {
            setEndDate(new Date(value));
        }
        else {
            setEndDate(value);
        }
    };
    return (React.createElement(Box, { as: "form", onSubmit: handleSubmit },
        message.text && (React.createElement(MessageBox, { style: { marginBottom: '1rem' }, variant: message.type, message: message.text })),
        React.createElement(Section, null,
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Discount Name"),
                React.createElement(Input, { required: true, value: record.params.name || '', onChange: (e) => handleChange('name', e.target.value) })),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Discount Code"),
                React.createElement(Input, { required: true, value: record.params.code || '', onChange: (e) => handleChange('code', e.target.value) }),
                React.createElement(Text, { mt: "sm", variant: "sm" }, "This is the code customers will enter at checkout")),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Discount Type"),
                React.createElement(Box, null,
                    React.createElement(CheckBox, { id: "discount-type-percentage", checked: discountType === 'percentage', onChange: () => setDiscountType('percentage'), value: "percentage" }),
                    React.createElement(Label, { inline: true, htmlFor: "discount-type-percentage" }, "Percentage (%)")),
                React.createElement(Box, { mt: "sm" },
                    React.createElement(CheckBox, { id: "discount-type-fixed", checked: discountType === 'fixed', onChange: () => setDiscountType('fixed'), value: "fixed" }),
                    React.createElement(Label, { inline: true, htmlFor: "discount-type-fixed" }, "Fixed Amount"))),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Value"),
                React.createElement(Input, { required: true, type: "number", min: "0", step: discountType === 'percentage' ? '1' : '0.01', value: record.params.value || '', onChange: (e) => handleChange('value', e.target.value) }),
                React.createElement(Text, { mt: "sm", variant: "sm" }, discountType === 'percentage'
                    ? 'Percentage discount (e.g. 10 for 10%)'
                    : 'Fixed amount discount')),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Minimum Order Value"),
                React.createElement(Input, { type: "number", min: "0", step: "0.01", value: record.params.min_order_value || '0', onChange: (e) => handleChange('min_order_value', e.target.value) }),
                React.createElement(Text, { mt: "sm", variant: "sm" }, "Minimum cart value required to use this discount (0 = no minimum)")),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Maximum Uses"),
                React.createElement(Input, { type: "number", min: "0", value: record.params.max_uses || '', onChange: (e) => handleChange('max_uses', e.target.value) }),
                React.createElement(Text, { mt: "sm", variant: "sm" }, "Maximum number of times this discount can be used (leave empty for unlimited)"))),
        React.createElement(Section, { title: "Validity Period" },
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Start Date"),
                React.createElement(DatePicker, { value: startDate, onChange: handleStartDateChange })),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "End Date (Optional)"),
                React.createElement(DatePicker, { value: endDate, onChange: handleEndDateChange }),
                React.createElement(Text, { mt: "sm", variant: "sm" }, "Leave empty for a discount with no expiration date")),
            React.createElement(FormGroup, null,
                React.createElement(Box, { mt: "lg" },
                    React.createElement(CheckBox, { id: "is-active", checked: isActive, onChange: () => setIsActive(!isActive) }),
                    React.createElement(Label, { inline: true, htmlFor: "is-active" }, "Active")))),
        React.createElement(Section, { title: "Discount Restrictions" },
            React.createElement(Text, { mb: "lg" }, "You can restrict this discount to specific products, collections, or customer groups. If none are selected, the discount will apply to all eligible orders."),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Products"),
                React.createElement(Box, { maxHeight: "200px", overflow: "auto", border: "1px solid", borderColor: "grey20", p: "md" }, products.length > 0 ? (products.map(product => (React.createElement(Box, { mb: "sm", key: product.id },
                    React.createElement(CheckBox, { id: `product-${product.id}`, checked: selectedProducts.includes(product.id), onChange: handleProductChange, value: product.id.toString() }),
                    React.createElement(Label, { inline: true, htmlFor: `product-${product.id}` }, product.name))))) : (React.createElement(Text, null, "No products available")))),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Collections"),
                React.createElement(Box, { maxHeight: "200px", overflow: "auto", border: "1px solid", borderColor: "grey20", p: "md" }, collections.length > 0 ? (collections.map(collection => (React.createElement(Box, { mb: "sm", key: collection.id },
                    React.createElement(CheckBox, { id: `collection-${collection.id}`, checked: selectedCollections.includes(collection.id), onChange: handleCollectionChange, value: collection.id.toString() }),
                    React.createElement(Label, { inline: true, htmlFor: `collection-${collection.id}` }, collection.name))))) : (React.createElement(Text, null, "No collections available")))),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Customer Groups"),
                React.createElement(Box, { maxHeight: "200px", overflow: "auto", border: "1px solid", borderColor: "grey20", p: "md" }, customerGroups.length > 0 ? (customerGroups.map(group => (React.createElement(Box, { mb: "sm", key: group.id },
                    React.createElement(CheckBox, { id: `group-${group.id}`, checked: selectedCustomerGroups.includes(group.id), onChange: handleCustomerGroupChange, value: group.id.toString() }),
                    React.createElement(Label, { inline: true, htmlFor: `group-${group.id}` }, group.name))))) : (React.createElement(Text, null, "No customer groups available"))))),
        React.createElement(Box, { mt: "xl" },
            React.createElement(Button, { variant: "primary", type: "submit", disabled: loading }, loading ? React.createElement(Loader, null) : (record.id ? 'Update Discount' : 'Create Discount')))));
};
export default DiscountForm;
