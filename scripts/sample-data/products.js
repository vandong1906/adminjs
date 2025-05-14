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
        id: 1,
        name: 'Premium Cotton T-Shirt',
        slug: 'premium-cotton-tshirt',
        description: 'High quality cotton t-shirt with modern fit',
        status: 'active',
        price: 29.99,
        compareAtPrice: 39.99,
        sku: 'TS-001',
        barcode: '123456789',
        inventoryQuantity: 100,
        weight: 0.2,
        weightUnit: 'kg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2, 
        name: 'Classic Denim Jeans',
        slug: 'classic-denim-jeans',
        description: 'Classic fit denim jeans with premium quality',
        status: 'active',
        price: 79.99,
        compareAtPrice: 99.99,
        sku: 'DJ-001',
        barcode: '987654321',
        inventoryQuantity: 50,
        weight: 0.5,
        weightUnit: 'kg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Leather Wallet',
        slug: 'leather-wallet',
        description: 'Genuine leather wallet with multiple card slots',
        status: 'active', 
        price: 49.99,
        compareAtPrice: 69.99,
        sku: 'LW-001',
        barcode: '456789123',
        inventoryQuantity: 75,
        weight: 0.1,
        weightUnit: 'kg',
        createdAt: new Date(),
        updatedAt: new Date()
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