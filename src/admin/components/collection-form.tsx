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

// Multi-select component for products
const ProductSelect = styled.select`
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

  // Fetch collection groups, parent collections and products on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch collection groups
        const groupsResponse = await fetch('/admin/api/collection-groups');
        const groupsData = await groupsResponse.json();
        setGroups(groupsData);
        
        // Fetch all collections for parent selection
        const collectionsResponse = await api.resourceAction({ resourceId: 'Collection', actionName: 'list' });
        setCollections(collectionsResponse.data.records || []);
        
        // Fetch products
        const productsResponse = await api.resourceAction({ resourceId: 'Product', actionName: 'list' });
        setProducts(productsResponse.data.records || []);
        
        // If editing, load the collection data
        if (isEditing) {
          // Fetch collection details with products
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
      } catch (e) {
        console.error('Error loading form data:', e);
        setError('Failed to load form data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isEditing, record, api]);
  
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name === 'product_ids') {
      // Get selected options for multi-select
      const selectedOptions = Array.from(e.target.selectedOptions as HTMLCollectionOf<HTMLOptionElement>, 
        (option: HTMLOptionElement) => option.value);
      setFormData(prev => ({
        ...prev,
        [name]: selectedOptions
      }));
    } else {
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
      
      // Redirect to the collection list after a short delay if creating new collection
      if (!isEditing) {
        setTimeout(() => {
          window.location.href = '/admin/resources/Collection';
        }, 1500);
      }
    } catch (e) {
      console.error('Error saving collection:', e);
      setError(e.message || 'Failed to save collection. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !formData.collection_group_id) {
    return (
      <Box>
        <Loader />
        <Text mt="default">Loading...</Text>
      </Box>
    );
  }
  
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <H3 mb="xl">{isEditing ? 'Edit Collection' : 'Create New Collection'}</H3>
      
      {error && (
        <MessageBox mb="xl" message={error} variant="danger" />
      )}
      
      {success && (
        <MessageBox mb="xl" message="Collection saved successfully!" variant="success" />
      )}
      
      <Box mb="xl">
        <FormGroup>
          <Label required>Collection Group</Label>
          <StatusSelect
            name="collection_group_id"
            value={formData.collection_group_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Collection Group</option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </StatusSelect>
        </FormGroup>
        
        <FormGroup>
          <Label>Parent Collection</Label>
          <StatusSelect
            name="parent_id"
            value={formData.parent_id || ''}
            onChange={handleInputChange}
          >
            <option value="">No Parent (Root Collection)</option>
            {collections
              .filter(c => c.id !== record?.id) // Don't show current collection as parent option
              .map(collection => (
                <option key={collection.id} value={collection.id}>
                  {collection.params.attribute_data?.name?.value || `Collection #${collection.id}`}
                </option>
              ))
            }
          </StatusSelect>
        </FormGroup>
        
        <FormGroup>
          <Label required>Type</Label>
          <StatusSelect
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="static">Static</option>
            <option value="dynamic">Dynamic</option>
          </StatusSelect>
          <Text mt="sm" variant="sm" color="grey60">
            Static collections have manually assigned products. Dynamic collections use rules to automatically assign products.
          </Text>
        </FormGroup>
        
        <FormGroup>
          <Label required>Sort</Label>
          <StatusSelect
            name="sort"
            value={formData.sort}
            onChange={handleInputChange}
            required
          >
            <option value="custom">Custom</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </StatusSelect>
        </FormGroup>
        
        {formData.type === 'static' && (
          <FormGroup>
            <Label>Products</Label>
            <ProductSelect
              name="product_ids"
              multiple
              value={formData.product_ids}
              onChange={handleInputChange}
            >
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.params.attribute_data?.name?.value || `Product #${product.id}`}
                </option>
              ))}
            </ProductSelect>
            <Text mt="sm" variant="sm" color="grey60">
              Hold Ctrl (or Command on Mac) to select multiple products
            </Text>
          </FormGroup>
        )}
      </Box>
      
      {/* Attribute Editor */}
      <Box mb="xl">
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
          onChange={handleAttributeChange}
        />
      </Box>
      
      <Box display="flex" justifyContent="flex-end">
        <Button
          as="a"
          href="/admin/resources/Collection"
          variant="light"
          mr="lg"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : (isEditing ? 'Update Collection' : 'Create Collection')}
        </Button>
      </Box>
    </Box>
  );
};

export default CollectionForm; 