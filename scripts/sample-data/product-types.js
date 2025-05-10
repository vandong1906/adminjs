import { models } from '../../src/db/models/association.js';

const createSampleProductTypes = async () => {
  try {
    console.log('Creating sample product types...');

    // Sample product type data
    const sampleProductTypes = [
      {
        name: 'Clothing',
        attribute_data: {
          attributes: [
            {
              name: 'Size',
              handle: 'size',
              type: 'select',
              required: true,
              searchable: true,
              filterable: true,
              options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
            },
            {
              name: 'Color',
              handle: 'color',
              type: 'select',
              required: true,
              searchable: true,
              filterable: true,
              options: ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow']
            },
            {
              name: 'Material',
              handle: 'material',
              type: 'select',
              required: false,
              searchable: true,
              filterable: true,
              options: ['Cotton', 'Polyester', 'Wool', 'Silk', 'Denim', 'Linen']
            }
          ]
        }
      },
      {
        name: 'Electronics',
        attribute_data: {
          attributes: [
            {
              name: 'Storage',
              handle: 'storage',
              type: 'select',
              required: true,
              searchable: true,
              filterable: true,
              options: ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB']
            },
            {
              name: 'Color',
              handle: 'color',
              type: 'select',
              required: true,
              searchable: true,
              filterable: true,
              options: ['Black', 'Silver', 'Gold', 'White', 'Blue', 'Red']
            },
            {
              name: 'Warranty',
              handle: 'warranty',
              type: 'select',
              required: false,
              searchable: true,
              filterable: true,
              options: ['3 months', '6 months', '12 months', '24 months', '36 months']
            }
          ]
        }
      },
      {
        name: 'Food & Beverages',
        attribute_data: {
          attributes: [
            {
              name: 'Weight',
              handle: 'weight',
              type: 'select',
              required: true,
              searchable: true,
              filterable: true,
              options: ['100g', '250g', '500g', '1kg', '2kg', '5kg']
            },
            {
              name: 'Flavor',
              handle: 'flavor',
              type: 'select',
              required: false,
              searchable: true,
              filterable: true,
              options: ['Original', 'Vanilla', 'Chocolate', 'Strawberry', 'Mint', 'Caramel']
            },
            {
              name: 'Dietary',
              handle: 'dietary',
              type: 'select',
              required: false,
              searchable: true,
              filterable: true,
              options: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Organic', 'Sugar-Free']
            }
          ]
        }
      }
    ];

    // Check if product types already exist
    const existingProductTypes = await models.ProductType.count();
    if (existingProductTypes > 0) {
      console.log(`Found ${existingProductTypes} existing product types. Skipping product type creation.`);
      return;
    }

    // Create product types
    const createdProductTypes = await Promise.all(
      sampleProductTypes.map(productTypeData => models.ProductType.create(productTypeData))
    );

    console.log(`Created ${createdProductTypes.length} sample product types.`);
  } catch (error) {
    console.error('Error creating sample product types:', error);
    throw error;
  }
};

export default createSampleProductTypes; 