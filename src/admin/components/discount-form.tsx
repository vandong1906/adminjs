import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormGroup,
  Label,
  Input,
  CheckBox,
  Section,
  Text,
  Loader,
  MessageBox,
  DatePicker,
  DropDown,
  DropDownItem,
} from '@adminjs/design-system';
import { useRecord, useTranslation } from 'adminjs';

// Define interfaces for strongly typed components
interface Product {
  id: number;
  name: string;
}

interface Collection {
  id: number;
  name: string;
}

interface CustomerGroup {
  id: number;
  name: string;
}

interface MessageState {
  type: string;
  text: string;
}

const DiscountForm: React.FC = () => {
  // @ts-ignore - Ignore the type error for useRecord
  const { record, handleChange, submit } = useRecord();
  const { translateButton } = useTranslation();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState>({ type: '', text: '' });
  
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [customerGroups, setCustomerGroups] = useState<CustomerGroup[]>([]);
  
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedCustomerGroups, setSelectedCustomerGroups] = useState<number[]>([]);
  
  const [discountType, setDiscountType] = useState('percentage');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Load products, collections and customer groups
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch('/admin/api/products?limit=100');
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData.products || []);
        }

        // Fetch collections
        const collectionsResponse = await fetch('/admin/api/collections?limit=100');
        if (collectionsResponse.ok) {
          const collectionsData = await collectionsResponse.json();
          setCollections(collectionsData.collections || []);
        }

        // Fetch customer groups
        const groupsResponse = await fetch('/admin/api/customer-groups');
        if (groupsResponse.ok) {
          const groupsData = await groupsResponse.json();
          setCustomerGroups(groupsData.groups || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Load discount data if editing an existing discount
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
            
            // Set selected products
            if (data.products && Array.isArray(data.products)) {
              setSelectedProducts(data.products.map((product: any) => product.id));
            }
            
            // Set selected collections
            if (data.collections && Array.isArray(data.collections)) {
              setSelectedCollections(data.collections.map((collection: any) => collection.id));
            }
            
            // Set selected customer groups
            if (data.customerGroups && Array.isArray(data.customerGroups)) {
              setSelectedCustomerGroups(data.customerGroups.map((group: any) => group.id));
            }
          }
        } catch (error) {
          console.error('Error fetching discount data:', error);
        }
      }
    };

    fetchData();
    fetchDiscountData();
  }, [record.id]);

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numValue = parseInt(value, 10);
    if (selectedProducts.includes(numValue)) {
      setSelectedProducts(selectedProducts.filter(id => id !== numValue));
    } else {
      setSelectedProducts([...selectedProducts, numValue]);
    }
  };

  const handleCollectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numValue = parseInt(value, 10);
    if (selectedCollections.includes(numValue)) {
      setSelectedCollections(selectedCollections.filter(id => id !== numValue));
    } else {
      setSelectedCollections([...selectedCollections, numValue]);
    }
  };

  const handleCustomerGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numValue = parseInt(value, 10);
    if (selectedCustomerGroups.includes(numValue)) {
      setSelectedCustomerGroups(selectedCustomerGroups.filter(id => id !== numValue));
    } else {
      setSelectedCustomerGroups([...selectedCustomerGroups, numValue]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Format dates
      const formattedStartDate = startDate ? startDate.toISOString() : new Date().toISOString();
      const formattedEndDate = endDate ? endDate.toISOString() : null;

      // Prepare form data
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
        // Update existing discount
        response = await fetch(`/admin/api/discounts/${record.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new discount
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
        
        // Refresh the record
        if (!record.id) {
          window.location.href = `/admin/resources/Discount/records/${data.id}/edit`;
        } else {
          submit().then(() => {
            // Refresh the page to show updated data
            window.location.reload();
          });
        }
      } else {
        const errorData = await response.json();
        setMessage({ type: 'danger', text: errorData.error || 'An error occurred' });
      }
    } catch (error) {
      console.error('Error saving discount:', error);
      setMessage({ type: 'danger', text: 'An error occurred while saving discount' });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle date changes from DatePicker
  const handleStartDateChange = (value: string | Date) => {
    if (typeof value === 'string') {
      setStartDate(new Date(value));
    } else {
      setStartDate(value);
    }
  };

  const handleEndDateChange = (value: string | Date) => {
    if (value === null) {
      setEndDate(null);
      return;
    }
    
    if (typeof value === 'string') {
      setEndDate(new Date(value));
    } else {
      setEndDate(value);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {message.text && (
        <MessageBox
          style={{ marginBottom: '1rem' }}
          variant={message.type as any}
          message={message.text}
        />
      )}

      <Section>
        <FormGroup>
          <Label required>Discount Name</Label>
          <Input
            required
            value={record.params.name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label required>Discount Code</Label>
          <Input
            required
            value={record.params.code || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('code', e.target.value)}
          />
          <Text mt="sm" variant="sm">This is the code customers will enter at checkout</Text>
        </FormGroup>

        <FormGroup>
          <Label required>Discount Type</Label>
          <Box>
            <CheckBox
              id="discount-type-percentage"
              checked={discountType === 'percentage'}
              onChange={() => setDiscountType('percentage')}
              value="percentage"
            />
            <Label inline htmlFor="discount-type-percentage">
              Percentage (%)
            </Label>
          </Box>
          <Box mt="sm">
            <CheckBox
              id="discount-type-fixed"
              checked={discountType === 'fixed'}
              onChange={() => setDiscountType('fixed')}
              value="fixed"
            />
            <Label inline htmlFor="discount-type-fixed">
              Fixed Amount
            </Label>
          </Box>
        </FormGroup>

        <FormGroup>
          <Label required>Value</Label>
          <Input
            required
            type="number"
            min="0"
            step={discountType === 'percentage' ? '1' : '0.01'}
            value={record.params.value || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('value', e.target.value)}
          />
          <Text mt="sm" variant="sm">
            {discountType === 'percentage' 
              ? 'Percentage discount (e.g. 10 for 10%)' 
              : 'Fixed amount discount'}
          </Text>
        </FormGroup>

        <FormGroup>
          <Label>Minimum Order Value</Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={record.params.min_order_value || '0'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('min_order_value', e.target.value)}
          />
          <Text mt="sm" variant="sm">Minimum cart value required to use this discount (0 = no minimum)</Text>
        </FormGroup>

        <FormGroup>
          <Label>Maximum Uses</Label>
          <Input
            type="number"
            min="0"
            value={record.params.max_uses || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('max_uses', e.target.value)}
          />
          <Text mt="sm" variant="sm">Maximum number of times this discount can be used (leave empty for unlimited)</Text>
        </FormGroup>
      </Section>

      <Section title="Validity Period">
        <FormGroup>
          <Label required>Start Date</Label>
          <DatePicker
            value={startDate}
            onChange={handleStartDateChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>End Date (Optional)</Label>
          <DatePicker
            value={endDate}
            onChange={handleEndDateChange}
          />
          <Text mt="sm" variant="sm">Leave empty for a discount with no expiration date</Text>
        </FormGroup>

        <FormGroup>
          <Box mt="lg">
            <CheckBox
              id="is-active"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <Label inline htmlFor="is-active">
              Active
            </Label>
          </Box>
        </FormGroup>
      </Section>

      <Section title="Discount Restrictions">
        <Text mb="lg">
          You can restrict this discount to specific products, collections, or customer groups.
          If none are selected, the discount will apply to all eligible orders.
        </Text>

        <FormGroup>
          <Label>Products</Label>
          <Box maxHeight="200px" overflow="auto" border="1px solid" borderColor="grey20" p="md">
            {products.length > 0 ? (
              products.map(product => (
                <Box mb="sm" key={product.id}>
                  <CheckBox
                    id={`product-${product.id}`}
                    checked={selectedProducts.includes(product.id)}
                    onChange={handleProductChange}
                    value={product.id.toString()}
                  />
                  <Label inline htmlFor={`product-${product.id}`}>
                    {product.name}
                  </Label>
                </Box>
              ))
            ) : (
              <Text>No products available</Text>
            )}
          </Box>
        </FormGroup>

        <FormGroup>
          <Label>Collections</Label>
          <Box maxHeight="200px" overflow="auto" border="1px solid" borderColor="grey20" p="md">
            {collections.length > 0 ? (
              collections.map(collection => (
                <Box mb="sm" key={collection.id}>
                  <CheckBox
                    id={`collection-${collection.id}`}
                    checked={selectedCollections.includes(collection.id)}
                    onChange={handleCollectionChange}
                    value={collection.id.toString()}
                  />
                  <Label inline htmlFor={`collection-${collection.id}`}>
                    {collection.name}
                  </Label>
                </Box>
              ))
            ) : (
              <Text>No collections available</Text>
            )}
          </Box>
        </FormGroup>

        <FormGroup>
          <Label>Customer Groups</Label>
          <Box maxHeight="200px" overflow="auto" border="1px solid" borderColor="grey20" p="md">
            {customerGroups.length > 0 ? (
              customerGroups.map(group => (
                <Box mb="sm" key={group.id}>
                  <CheckBox
                    id={`group-${group.id}`}
                    checked={selectedCustomerGroups.includes(group.id)}
                    onChange={handleCustomerGroupChange}
                    value={group.id.toString()}
                  />
                  <Label inline htmlFor={`group-${group.id}`}>
                    {group.name}
                  </Label>
                </Box>
              ))
            ) : (
              <Text>No customer groups available</Text>
            )}
          </Box>
        </FormGroup>
      </Section>

      <Box mt="xl">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Loader /> : (record.id ? 'Update Discount' : 'Create Discount')}
        </Button>
      </Box>
    </Box>
  );
};

export default DiscountForm; 