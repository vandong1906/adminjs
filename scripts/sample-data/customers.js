import { models } from '../../src/db/models/association.js';

const createSampleCustomers = async () => {
  try {
    console.log('Creating sample customers...');

    // Sample customer data
    const sampleCustomers = [
      {
        title: 'Mr',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        company_name: 'ABC Corp',
        vat_no: '',
        meta: {
          notes: 'Regular customer',
          preferences: {
            shipping: 'express',
            marketing: true
          }
        }
      },
      {
        title: 'Mrs',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1987654321',
        company_name: '',
        vat_no: '',
        meta: {
          notes: 'Premium customer',
          preferences: {
            shipping: 'standard',
            marketing: false
          }
        }
      },
      {
        title: 'Ms',
        first_name: 'Emily',
        last_name: 'Johnson',
        email: 'emily.johnson@example.com',
        phone: '+1122334455',
        company_name: 'Johnson Ltd',
        vat_no: 'GB123456789',
        meta: {
          notes: 'Business customer',
          preferences: {
            shipping: 'overnight',
            marketing: true
          }
        }
      },
      {
        title: 'Mr',
        first_name: 'Nguyen',
        last_name: 'Van A',
        email: 'nguyenvana@example.com',
        phone: '+84123456789',
        company_name: 'Công ty TNHH A',
        vat_no: 'VN1234567890',
        meta: {
          notes: 'Vietnamese customer',
          preferences: {
            shipping: 'standard',
            marketing: true
          }
        }
      },
      {
        title: 'Mrs',
        first_name: 'Tran',
        last_name: 'Thi B',
        email: 'tranthib@example.com',
        phone: '+84987654321',
        company_name: '',
        vat_no: '',
        meta: {
          notes: 'Regular Vietnamese customer',
          preferences: {
            shipping: 'express',
            marketing: false
          }
        }
      }
    ];

    // Check if customers already exist
    const existingCustomers = await models.Customer.count();
    if (existingCustomers > 0) {
      console.log(`Found ${existingCustomers} existing customers. Skipping customer creation.`);
      return;
    }

    // Create customers
    const createdCustomers = await Promise.all(
      sampleCustomers.map(customerData => models.Customer.create(customerData))
    );

    console.log(`Created ${createdCustomers.length} sample customers.`);

    // Create sample addresses for customers
    const countries = await models.Country.findAll() || [];
    
    if (countries.length === 0) {
      // Create a default country if none exist
      const defaultCountry = await models.Country.create({
        name: 'United States',
        iso_2: 'US',
        iso_3: 'USA',
        iso_numeric: 840,
        phonecode: '1',
        capital: 'Washington D.C.',
        currency: 'USD',
        native: 'United States',
      });
      
      countries.push(defaultCountry);
    }
    
    // Sample addresses for each customer
    for (const customer of createdCustomers) {
      await models.Address.create({
        customer_id: customer.id,
        country_id: countries[0].id,
        title: customer.title,
        first_name: customer.first_name,
        last_name: customer.last_name,
        company_name: customer.company_name,
        line_one: '123 Main Street',
        line_two: 'Apt 4B',
        line_three: '',
        city: 'New York',
        state: 'NY',
        postcode: '10001',
        delivery_instructions: 'Leave at door',
        contact_email: customer.email,
        contact_phone: customer.phone,
        type: 'shipping',
        default: true,
        meta: {
          is_billing: true
        }
      });
    }

    console.log(`Created addresses for ${createdCustomers.length} customers.`);
  } catch (error) {
    console.error('Error creating sample customers:', error);
    throw error;
  }
};

export default createSampleCustomers; 