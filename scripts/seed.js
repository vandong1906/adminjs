import dotenv from 'dotenv';
dotenv.config();

import initializeDb from '../src/db/index.js';
import createSampleUsers from './sample-data/users.js';
import createSampleChannels from './sample-data/channels.js';
import createSampleCurrencies from './sample-data/currencies.js';
import createSampleCustomers from './sample-data/customers.js';
import createSampleProductTypes from './sample-data/product-types.js';
import createSampleProducts from './sample-data/products.js';
import createSampleProductVariants from './sample-data/product-variants.js';
import createSampleDiscounts from './sample-data/discounts.js';
import createSampleCarts from './sample-data/carts.js';
import createSampleOrders from './sample-data/orders.js';
import createSampleOrderLines from './sample-data/order-lines.js';

// Import other sample data creators as needed
import createSampleCountries from './sample-data/countries.js';
const seedDatabase = async () => {
  try {
    console.log('Initializing database connection...');
    await initializeDb();
    
    console.log('Starting database seeding...');
    
    // Run sample data creators in sequence
    await createSampleUsers();
    await createSampleChannels();
    await createSampleCurrencies();
    await createSampleCustomers();
    await createSampleProductTypes();
    await createSampleProducts();
    await createSampleProductVariants();
    await createSampleDiscounts();
    await createSampleCarts();
    // await createSampleOrders();
    await createSampleCountries(); 
    // await createSampleOrderLines();
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 