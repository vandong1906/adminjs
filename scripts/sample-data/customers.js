import { models } from '../../src/db/models/association.js';

const createSampleCustomers = async () => {
  try {
    console.log('Creating sample customers...');

    const customers = [
      {
        id: 1,
        first_name: 'John',
        last_name : 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        status: 'active',
        defaultAddressId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        first_name: 'Jane',
        last_name : 'Smith',
        email: 'jane.smith@example.com', 
        phone: '+1987654321',
        status: 'active',
        defaultAddressId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        first_name: 'Mike',
        last_name : 'Johnson',
        email: 'mike.johnson@example.com',
        phone: '+1122334455',
        status: 'active',
        defaultAddressId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const customerGroups = [
      {
        id: 1,
        name: 'VIP Customers',
        description: 'High-value customers with special privileges',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Regular Customers',
        description: 'Standard customer group',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'New Customers',
        description: 'Recently registered customers',
        createdAt: new Date(),
        updatedAt: new Date()
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
      customers.map(customerData => models.Customer.create(customerData))
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
        emoji: '🇺🇸',
        emoji_u: 'U+1F1FA U+1F1F8'
      });
      
      countries.push(defaultCountry);
    }
    
    // Sample addresses for each customer
    for (const customer of createdCustomers) {
      await models.Address.create({
        customer_id: customer.id,
        country_id: countries[0].id,
        title: customer.title,
        first_name: customer.firstName,
        last_name: customer.lastName,
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

    return {
      customers,
      customerGroups
    };
  } catch (error) {
    console.error('Error creating sample customers:', error);
    throw error;
  }
};

export default createSampleCustomers; 