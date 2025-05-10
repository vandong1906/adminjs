import { models } from '../../src/db/models/association.js';

const createSampleProducts = async () => {
  try {
    console.log('Creating sample products...');

    // Get product types
    const productTypes = await models.ProductType.findAll();
    
    if (productTypes.length === 0) {
      console.log('No product types found. Please create product types first.');
      return;
    }
    
    // Get a product type by name or use the first one
    const getProductType = (name) => {
      const productType = productTypes.find(pt => pt.name === name);
      return productType || productTypes[0];
    };

    // Create a brand if none exists
    let brand = await models.Brand.findOne();
    
    if (!brand) {
      brand = await models.Brand.create({
        name: 'Sample Brand',
        handle: 'sample-brand',
      });
      console.log('Created a sample brand.');
    }

    // Sample product data
    const sampleProducts = [
      {
        product_type_id: getProductType('Clothing').id,
        status: 'published',
        brand_id: brand.id,
        attribute_data: {
          name: 'Basic T-Shirt',
          description: 'A comfortable cotton t-shirt available in various colors and sizes.',
          price: 19.99,
          slug: 'basic-t-shirt',
        }
      },
      {
        product_type_id: getProductType('Electronics').id,
        status: 'published',
        brand_id: brand.id,
        attribute_data: {
          name: 'Smartphone Pro',
          description: 'The latest smartphone with advanced features and exceptional performance.',
          price: 999.99,
          slug: 'smartphone-pro',
        }
      },
      {
        product_type_id: getProductType('Food & Beverages').id,
        status: 'published',
        brand_id: brand.id,
        attribute_data: {
          name: 'Premium Coffee Beans',
          description: 'High-quality coffee beans sourced from the finest regions.',
          price: 14.99,
          slug: 'premium-coffee-beans',
        }
      },
      {
        product_type_id: getProductType('Clothing').id,
        status: 'published',
        brand_id: brand.id,
        attribute_data: {
          name: 'Denim Jeans',
          description: 'Classic denim jeans with a comfortable fit and durable material.',
          price: 49.99,
          slug: 'denim-jeans',
        }
      },
      {
        product_type_id: getProductType('Electronics').id,
        status: 'draft',
        brand_id: brand.id,
        attribute_data: {
          name: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation.',
          price: 149.99,
          slug: 'wireless-headphones',
        }
      }
    ];

    // Check if products already exist
    const existingProducts = await models.Product.count();
    if (existingProducts > 0) {
      console.log(`Found ${existingProducts} existing products. Skipping product creation.`);
      return;
    }

    // Create products
    const createdProducts = await Promise.all(
      sampleProducts.map(productData => models.Product.create(productData))
    );

    console.log(`Created ${createdProducts.length} sample products.`);
    
    // Create tax class for product variants if none exists
    let taxClass = await models.TaxClass.findOne();
    
    if (!taxClass) {
      taxClass = await models.TaxClass.create({
        name: 'Standard Rate',
        default: true,
      });
      console.log('Created a standard tax class.');
    }
    
  } catch (error) {
    console.error('Error creating sample products:', error);
    throw error;
  }
};

export default createSampleProducts; 