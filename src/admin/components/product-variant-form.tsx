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

const NumberInput = styled.input.attrs({ type: 'number' })`
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

const Select = styled.select`
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

const ImageUpload = styled.div`
  margin-top: 10px;
  border: 2px dashed #C0C9D4;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #3795BE;
    background-color: rgba(55, 149, 190, 0.05);
  }
  
  input {
    display: none;
  }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .remove-btn {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #FF5C5C;
    
    &:hover {
      background: white;
      color: #FF0000;
    }
  }
`;

const ProductVariantForm = (props) => {
  const { record, resource, action } = props;
  const isEditing = record && record.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    product_id: '',
    sku: '',
    stock: 0,
    unit_quantity: 1,
    backorder: null,
    purchasable: 'always',
    attribute_data: {},
  });
  
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [products, setProducts] = useState([]);
  const api = new ApiClient();

  // Fetch products on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Only try to fetch products, since they should definitely exist
        const productsResponse = await api.resourceAction({ resourceId: 'Product', actionName: 'list' });
        setProducts(productsResponse.data.records || []);
        
        // If editing, load the product variant data
        if (isEditing) {
          try {
            const variantResponse = await fetch(`/admin/api/product-variants/${record.id}`);
            if (variantResponse.ok) {
              const variantData = await variantResponse.json();
              setFormData({
                product_id: variantData.product_id || '',
                sku: variantData.sku || '',
                stock: variantData.stock || 0,
                unit_quantity: variantData.unit_quantity || 1,
                backorder: variantData.backorder || null,
                purchasable: variantData.purchasable || 'always',
                attribute_data: variantData.attribute_data || {},
              });
            }
          } catch (e) {
            console.error('Error loading variant data:', e);
          }
          
          // Fetch existing images
          try {
            const imagesResponse = await fetch(`/admin/api/product-variants/${record.id}/images`);
            if (imagesResponse.ok) {
              const imagesData = await imagesResponse.json();
              setExistingImages(imagesData);
            }
          } catch (e) {
            console.error('Error fetching variant images:', e);
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
  }, [isEditing, record]);
  
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };
  
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file as Blob)
    }));
    
    setImages(prev => [...prev, ...newImages]);
  };
  
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeExistingImage = async (imageId) => {
    try {
      const response = await fetch(`/admin/api/media/${imageId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setExistingImages(prev => prev.filter(img => img.id !== imageId));
      } else {
        setError('Failed to remove image. Please try again.');
      }
    } catch (e) {
      console.error('Error removing image:', e);
      setError('Failed to remove image. Please try again.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const apiEndpoint = isEditing 
        ? `/admin/api/product-variants/${record.id}`
        : '/admin/api/product-variants';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      // First save the product variant
      const response = await fetch(apiEndpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred while saving the product variant');
      }
      
      const data = await response.json();
      const variantId = data.id || record.id;
      
      // Then upload any images if present
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach(img => {
          formData.append('images', img.file);
        });
        
        const uploadResponse = await fetch(`/admin/api/product-variants/${variantId}/images`, {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Images were uploaded but failed to associate with the variant');
        }
      }
      
      setSuccess(true);
      
      // Redirect to the product variant list after a short delay if creating new variant
      if (!isEditing) {
        setTimeout(() => {
          window.location.href = '/admin/resources/ProductVariant';
        }, 1500);
      }
    } catch (e) {
      console.error('Error saving product variant:', e);
      setError(e.message || 'Failed to save product variant. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !formData.product_id) {
    return (
      <Box>
        <Loader />
        <Text mt="default">Loading...</Text>
      </Box>
    );
  }
  
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <H3 mb="xl">{isEditing ? 'Edit Product Variant' : 'Create New Product Variant'}</H3>
      
      {error && (
        <MessageBox mb="xl" message={error} variant="danger" />
      )}
      
      {success && (
        <MessageBox mb="xl" message="Product variant saved successfully!" variant="success" />
      )}
      
      <Box mb="xl">
        <FormGroup>
          <Label required>Product</Label>
          <Select
            name="product_id"
            value={formData.product_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.id} - {product.params.attribute_data?.name || 'Unnamed Product'}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label>SKU</Label>
          <TextInput
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            placeholder="SKU"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Stock</Label>
          <NumberInput
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            min="0"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Unit Quantity</Label>
          <NumberInput
            name="unit_quantity"
            value={formData.unit_quantity}
            onChange={handleInputChange}
            min="1"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Purchasable</Label>
          <Select
            name="purchasable"
            value={formData.purchasable}
            onChange={handleInputChange}
          >
            <option value="always">Always</option>
            <option value="when_in_stock">When In Stock</option>
            <option value="never">Never</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label>Images</Label>
          <ImageUpload>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImageSelect} 
            />
            <Text>Click to upload or drag and drop</Text>
            <Text variant="sm" mt="default">JPEG, PNG, GIF up to 5MB</Text>
          </ImageUpload>
          
          {images.length > 0 && (
            <ImagePreviewContainer>
              {images.map((img, index) => (
                <ImagePreview key={index}>
                  <img src={img.preview} alt="Preview" />
                  <div className="remove-btn" onClick={() => removeImage(index)}>×</div>
                </ImagePreview>
              ))}
            </ImagePreviewContainer>
          )}
          
          {existingImages.length > 0 && (
            <>
              <Text mt="lg" mb="sm">Existing Images</Text>
              <ImagePreviewContainer>
                {existingImages.map(img => (
                  <ImagePreview key={img.id}>
                    <img src={img.url} alt={img.name} />
                    <div className="remove-btn" onClick={() => removeExistingImage(img.id)}>×</div>
                  </ImagePreview>
                ))}
              </ImagePreviewContainer>
            </>
          )}
        </FormGroup>
      </Box>
      
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Product Variant'}
      </Button>
    </Box>
  );
};

export default ProductVariantForm; 