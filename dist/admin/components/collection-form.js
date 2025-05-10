import React, { useState, useEffect } from 'react';
import { Box, H3, Label, Text, Button, MessageBox, Loader, FormGroup } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import styled from 'styled-components';
import AttributeEditor from './attribute-editor.js';
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
const ProductSelect = styled.select `
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C0C9D4;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  outline: none;
  background-color: white;
  min-height: 150px;
  
  &:focus {
    border-color: #3795BE;
    box-shadow: 0 0 0 2px rgba(55, 149, 190, 0.2);
  }
`;
const CollectionForm = (props) => {
    const { record, resource, action } = props;
    const isEditing = record && record.id;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        collection_group_id: '',
        parent_id: null,
        type: 'static',
        sort: 'custom',
        product_ids: [],
        attribute_data: {},
    });
    const [groups, setGroups] = useState([]);
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);
    const api = new ApiClient();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const groupsResponse = await fetch('/admin/api/collection-groups');
                const groupsData = await groupsResponse.json();
                setGroups(groupsData);
                const collectionsResponse = await api.resourceAction({ resourceId: 'Collection', actionName: 'list' });
                setCollections(collectionsResponse.data.records || []);
                const productsResponse = await api.resourceAction({ resourceId: 'Product', actionName: 'list' });
                setProducts(productsResponse.data.records || []);
                if (isEditing) {
                    const collectionResponse = await fetch(`/admin/api/collections/${record.id}`);
                    if (collectionResponse.ok) {
                        const collectionData = await collectionResponse.json();
                        setFormData({
                            collection_group_id: collectionData.collection_group_id || '',
                            parent_id: collectionData.parent_id || null,
                            type: collectionData.type || 'static',
                            sort: collectionData.sort || 'custom',
                            product_ids: (collectionData.products || []).map(p => p.id),
                            attribute_data: collectionData.attribute_data || {},
                        });
                    }
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
    }, [isEditing, record, api]);
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        if (name === 'product_ids') {
            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
            setFormData(prev => ({
                ...prev,
                [name]: selectedOptions
            }));
        }
        else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
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
                ? `/admin/api/collections/${record.id}`
                : '/admin/api/collections';
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
                throw new Error(errorData.error || 'An error occurred while saving the collection');
            }
            const data = await response.json();
            setSuccess(true);
            if (!isEditing) {
                setTimeout(() => {
                    window.location.href = '/admin/resources/Collection';
                }, 1500);
            }
        }
        catch (e) {
            console.error('Error saving collection:', e);
            setError(e.message || 'Failed to save collection. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    if (loading && !formData.collection_group_id) {
        return (React.createElement(Box, null,
            React.createElement(Loader, null),
            React.createElement(Text, { mt: "default" }, "Loading...")));
    }
    return (React.createElement(Box, { as: "form", onSubmit: handleSubmit },
        React.createElement(H3, { mb: "xl" }, isEditing ? 'Edit Collection' : 'Create New Collection'),
        error && (React.createElement(MessageBox, { mb: "xl", message: error, variant: "danger" })),
        success && (React.createElement(MessageBox, { mb: "xl", message: "Collection saved successfully!", variant: "success" })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Collection Group"),
                React.createElement(StatusSelect, { name: "collection_group_id", value: formData.collection_group_id, onChange: handleInputChange, required: true },
                    React.createElement("option", { value: "" }, "Select Collection Group"),
                    groups.map(group => (React.createElement("option", { key: group.id, value: group.id }, group.name))))),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Parent Collection"),
                React.createElement(StatusSelect, { name: "parent_id", value: formData.parent_id || '', onChange: handleInputChange },
                    React.createElement("option", { value: "" }, "No Parent (Root Collection)"),
                    collections
                        .filter(c => c.id !== record?.id)
                        .map(collection => (React.createElement("option", { key: collection.id, value: collection.id }, collection.params.attribute_data?.name?.value || `Collection #${collection.id}`))))),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Type"),
                React.createElement(StatusSelect, { name: "type", value: formData.type, onChange: handleInputChange, required: true },
                    React.createElement("option", { value: "static" }, "Static"),
                    React.createElement("option", { value: "dynamic" }, "Dynamic")),
                React.createElement(Text, { mt: "sm", variant: "sm", color: "grey60" }, "Static collections have manually assigned products. Dynamic collections use rules to automatically assign products.")),
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Sort"),
                React.createElement(StatusSelect, { name: "sort", value: formData.sort, onChange: handleInputChange, required: true },
                    React.createElement("option", { value: "custom" }, "Custom"),
                    React.createElement("option", { value: "name_asc" }, "Name (A-Z)"),
                    React.createElement("option", { value: "name_desc" }, "Name (Z-A)"),
                    React.createElement("option", { value: "price_asc" }, "Price (Low to High)"),
                    React.createElement("option", { value: "price_desc" }, "Price (High to Low)"),
                    React.createElement("option", { value: "newest" }, "Newest First"),
                    React.createElement("option", { value: "oldest" }, "Oldest First"))),
            formData.type === 'static' && (React.createElement(FormGroup, null,
                React.createElement(Label, null, "Products"),
                React.createElement(ProductSelect, { name: "product_ids", multiple: true, value: formData.product_ids, onChange: handleInputChange }, products.map(product => (React.createElement("option", { key: product.id, value: product.id }, product.params.attribute_data?.name?.value || `Product #${product.id}`)))),
                React.createElement(Text, { mt: "sm", variant: "sm", color: "grey60" }, "Hold Ctrl (or Command on Mac) to select multiple products")))),
        React.createElement(Box, { mb: "xl" },
            React.createElement(AttributeEditor, { record: {
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
                }, onChange: handleAttributeChange })),
        React.createElement(Box, { display: "flex", justifyContent: "flex-end" },
            React.createElement(Button, { as: "a", href: "/admin/resources/Collection", variant: "light", mr: "lg" }, "Cancel"),
            React.createElement(Button, { type: "submit", variant: "primary", disabled: loading }, loading ? 'Saving...' : (isEditing ? 'Update Collection' : 'Create Collection')))));
};
export default CollectionForm;
