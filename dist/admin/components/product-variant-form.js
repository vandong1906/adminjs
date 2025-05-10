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
const NumberInput = styled.input.attrs({ type: 'number' }) `
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
const Select = styled.select `
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
const ImageUpload = styled.div `
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
const ImagePreviewContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;
const ImagePreview = styled.div `
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const productsResponse = await api.resourceAction({ resourceId: 'Product', actionName: 'list' });
                setProducts(productsResponse.data.records || []);
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
                    }
                    catch (e) {
                        console.error('Error loading variant data:', e);
                    }
                    try {
                        const imagesResponse = await fetch(`/admin/api/product-variants/${record.id}/images`);
                        if (imagesResponse.ok) {
                            const imagesData = await imagesResponse.json();
                            setExistingImages(imagesData);
                        }
                    }
                    catch (e) {
                        console.error('Error fetching variant images:', e);
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
            preview: URL.createObjectURL(file)
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
            }
            else {
                setError('Failed to remove image. Please try again.');
            }
        }
        catch (e) {
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
            if (!isEditing) {
                setTimeout(() => {
                    window.location.href = '/admin/resources/ProductVariant';
                }, 1500);
            }
        }
        catch (e) {
            console.error('Error saving product variant:', e);
            setError(e.message || 'Failed to save product variant. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    if (loading && !formData.product_id) {
        return (React.createElement(Box, null,
            React.createElement(Loader, null),
            React.createElement(Text, { mt: "default" }, "Loading...")));
    }
    return (React.createElement(Box, { as: "form", onSubmit: handleSubmit },
        React.createElement(H3, { mb: "xl" }, isEditing ? 'Edit Product Variant' : 'Create New Product Variant'),
        error && (React.createElement(MessageBox, { mb: "xl", message: error, variant: "danger" })),
        success && (React.createElement(MessageBox, { mb: "xl", message: "Product variant saved successfully!", variant: "success" })),
        React.createElement(Box, { mb: "xl" },
            React.createElement(FormGroup, null,
                React.createElement(Label, { required: true }, "Product"),
                React.createElement(Select, { name: "product_id", value: formData.product_id, onChange: handleInputChange, required: true },
                    React.createElement("option", { value: "" }, "Select Product"),
                    products.map(product => (React.createElement("option", { key: product.id, value: product.id },
                        product.id,
                        " - ",
                        product.params.attribute_data?.name || 'Unnamed Product'))))),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "SKU"),
                React.createElement(TextInput, { name: "sku", value: formData.sku, onChange: handleInputChange, placeholder: "SKU" })),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Stock"),
                React.createElement(NumberInput, { name: "stock", value: formData.stock, onChange: handleInputChange, min: "0" })),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Unit Quantity"),
                React.createElement(NumberInput, { name: "unit_quantity", value: formData.unit_quantity, onChange: handleInputChange, min: "1" })),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Purchasable"),
                React.createElement(Select, { name: "purchasable", value: formData.purchasable, onChange: handleInputChange },
                    React.createElement("option", { value: "always" }, "Always"),
                    React.createElement("option", { value: "when_in_stock" }, "When In Stock"),
                    React.createElement("option", { value: "never" }, "Never"))),
            React.createElement(FormGroup, null,
                React.createElement(Label, null, "Images"),
                React.createElement(ImageUpload, null,
                    React.createElement("input", { type: "file", accept: "image/*", multiple: true, onChange: handleImageSelect }),
                    React.createElement(Text, null, "Click to upload or drag and drop"),
                    React.createElement(Text, { variant: "sm", mt: "default" }, "JPEG, PNG, GIF up to 5MB")),
                images.length > 0 && (React.createElement(ImagePreviewContainer, null, images.map((img, index) => (React.createElement(ImagePreview, { key: index },
                    React.createElement("img", { src: img.preview, alt: "Preview" }),
                    React.createElement("div", { className: "remove-btn", onClick: () => removeImage(index) }, "\u00D7")))))),
                existingImages.length > 0 && (React.createElement(React.Fragment, null,
                    React.createElement(Text, { mt: "lg", mb: "sm" }, "Existing Images"),
                    React.createElement(ImagePreviewContainer, null, existingImages.map(img => (React.createElement(ImagePreview, { key: img.id },
                        React.createElement("img", { src: img.url, alt: img.name }),
                        React.createElement("div", { className: "remove-btn", onClick: () => removeExistingImage(img.id) }, "\u00D7"))))))))),
        React.createElement(Button, { type: "submit", disabled: loading }, loading ? 'Saving...' : 'Save Product Variant')));
};
export default ProductVariantForm;
