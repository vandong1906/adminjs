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
} from '@adminjs/design-system';
import { useRecord, useTranslation } from 'adminjs';

// Define interfaces for strongly typed components
interface CustomerGroup {
  id: number;
  name: string;
}

interface MessageState {
  type: string;
  text: string;
}

const CustomerForm: React.FC = () => {
  // @ts-ignore - Ignore the type error for useRecord
  const { record, handleChange, submit } = useRecord();
  const { translateButton } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState>({ type: '', text: '' });
  const [customerGroups, setCustomerGroups] = useState<CustomerGroup[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);

  useEffect(() => {
    // Load customer groups
    const fetchCustomerGroups = async () => {
      try {
        const response = await fetch('/admin/api/customer-groups');
        if (response.ok) {
          const data = await response.json();
          setCustomerGroups(data);
        }
      } catch (error) {
        console.error('Error fetching customer groups:', error);
      }
    };

    // Load selected groups if editing an existing customer
    const fetchCustomerData = async () => {
      if (record.id) {
        try {
          const response = await fetch(`/admin/api/customers/${record.id}`);
          if (response.ok) {
            const data = await response.json();
            if (data.customerGroups && Array.isArray(data.customerGroups)) {
              setSelectedGroups(data.customerGroups.map((group: any) => group.id));
            }
          }
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      }
    };

    fetchCustomerGroups();
    fetchCustomerData();
    console.log('Customer groups:', customerGroups);
    console.log('Selected groups:', selectedGroups);
  }, [record.id]);

  const handleGroupsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numValue = parseInt(value, 10);
    if (selectedGroups.includes(numValue)) {
      setSelectedGroups(selectedGroups.filter(id => id !== numValue));
    } else {
      setSelectedGroups([...selectedGroups, numValue]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Prepare form data
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
        // Update existing customer
        response = await fetch(`/admin/api/customers/${record.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new customer
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
        
        // Refresh the record
        if (!record.id) {
          window.location.href = `/admin/resources/Customer/records/${data.id}/edit`;
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
      console.error('Error saving customer:', error);
      setMessage({ type: 'danger', text: 'An error occurred while saving customer' });
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymize = async () => {
    if (!record.id) return;

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
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        const errorData = await response.json();
        setMessage({ type: 'danger', text: errorData.error || 'An error occurred' });
      }
    } catch (error) {
      console.error('Error anonymizing customer:', error);
      setMessage({ type: 'danger', text: 'An error occurred while anonymizing customer' });
    } finally {
      setLoading(false);
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
          <Label>Title</Label>
          <select
            className="adminjs-select"
            value={record.params.title || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('title', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
        </FormGroup>

        <FormGroup>
          <Label required>First Name</Label>
          <Input
            required
            value={record.params.first_name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('first_name', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label required>Last Name</Label>
          <Input
            required
            value={record.params.last_name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('last_name', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label required>Email Address</Label>
          <Input
            required
            type="email"
            value={record.params.email || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Phone</Label>
          <Input
            value={record.params.phone || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section title="Company Information">
        <FormGroup>
          <Label>Company Name</Label>
          <Input
            value={record.params.company_name || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('company_name', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>VAT Number</Label>
          <Input
            value={record.params.vat_no || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('vat_no', e.target.value)}
          />
        </FormGroup>
      </Section>

      <Section title="Customer Groups">
        {customerGroups.length > 0 ? (
          <FormGroup>
            {customerGroups.map(group => (
              <Box mb="default" key={group.id}>
                <CheckBox
                  id={`group-${group.id}`}
                  checked={selectedGroups.includes(group.id)}
                  onChange={handleGroupsChange}
                  value={group.id.toString()}
                />
                <Label inline htmlFor={`group-${group.id}`}>
                  {group.name}
                </Label>
              </Box>
            ))}
          </FormGroup>
        ) : (
          <Text>No customer groups available</Text>
        )}
      </Section>

      <Box mt="xl">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Loader /> : (record.id ? 'Update Customer' : 'Create Customer')}
        </Button>

        {record.id && (
          <Button
            ml="default"
            variant="danger"
            type="button"
            onClick={handleAnonymize}
            disabled={loading}
          >
            Anonymize Customer
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CustomerForm; 