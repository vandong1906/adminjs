import { models } from '../../src/db/models/association.js';

const createSampleDiscounts = async () => {
  try {
    console.log('Creating sample discounts...');

    // Sample discount data
    const sampleDiscounts = [
      {
        name: 'Summer Sale 20% Off',
        handle: 'SUMMER20',
        type: 'percentage',
        code: 'SUMMER20',
        value: 20,
        min_order_value: 50,
        max_uses: 100,
        used_count: 0,
        starts_at: new Date(),
        ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        is_active: true,
      },
      {
        name: 'New Customer $10 Off',
        handle: 'WELCOME10',
        type: 'fixed',
        code: 'WELCOME10',
        value: 10,
        min_order_value: 25,
        max_uses: 1000,
        used_count: 0,
        starts_at: new Date(),
        ends_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        is_active: true,
      },
      {
        name: 'Free Shipping',
        handle: 'FREESHIP',
        type: 'fixed',
        code: 'FREESHIP',
        value: 5,
        min_order_value: 35,
        max_uses: 500,
        used_count: 0,
        starts_at: new Date(),
        ends_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        is_active: true,
      },
      {
        name: 'Holiday Special 30% Off',
        handle: 'HOLIDAY30',
        type: 'percentage',
        code: 'HOLIDAY30',
        value: 30,
        min_order_value: 100,
        max_uses: 200,
        used_count: 0,
        starts_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Start in 30 days
        ends_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // End in 60 days
        is_active: false,
      }
    ];

    // Check if discounts already exist
    const existingDiscounts = await models.Discount.count();
    if (existingDiscounts > 0) {
      console.log(`Found ${existingDiscounts} existing discounts. Skipping discount creation.`);
      return;
    }

    // Create discounts
    const createdDiscounts = await Promise.all(
      sampleDiscounts.map(discountData => models.Discount.create(discountData))
    );

    console.log(`Created ${createdDiscounts.length} sample discounts.`);

    // Get product variants to create discount associations
    const variants = await models.ProductVariant.findAll({ limit: 5 });
    
    if (variants.length > 0) {
      // Associate some variants with the discounts
      await Promise.all(
        createdDiscounts.slice(0, 2).map(discount => 
          Promise.all(
            variants.slice(0, 3).map(variant => 
              models.DiscountPurchasable.create({
                discount_id: discount.id,
                purchasable_type: 'ProductVariant',
                purchasable_id: variant.id
              })
            )
          )
        )
      );
      
      console.log('Associated product variants with discounts.');
    }
  } catch (error) {
    console.error('Error creating sample discounts:', error);
    throw error;
  }
};

export default createSampleDiscounts; 