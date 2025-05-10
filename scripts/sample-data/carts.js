import { models } from '../../src/db/models/association.js';

const createSampleCarts = async () => {
  try {
    console.log('Creating sample carts...');

    // Get necessary data for foreign keys
    const customers = await models.Customer.findAll();
    const users = await models.User.findAll();
    const channels = await models.Channel.findAll();
    const currencies = await models.Currency.findAll();
    const variants = await models.ProductVariant.findAll();
    const discounts = await models.Discount.findAll();

    if (customers.length === 0 || variants.length === 0) {
      console.log('No customers or product variants found. Please create them first.');
      return;
    }

    const defaultCurrency = currencies.find(c => c.default) || currencies[0];
    const defaultChannel = channels.find(c => c.default) || channels[0];

    // Check if carts already exist
    const existingCarts = await models.Cart.count();
    if (existingCarts > 0) {
      console.log(`Found ${existingCarts} existing carts. Skipping cart creation.`);
      return;
    }

    // Sample cart data
    const sampleCarts = [
      {
        // Completed cart with order
        user_id: users[0]?.id || null,
        customer_id: customers[0]?.id || null,
        channel_id: defaultChannel?.id || null,
        currency_id: defaultCurrency?.id || null,
        coupon_code: 'SUMMER20', // Reference to discount code
        completed_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        meta: {
          device: 'desktop',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ip_address: '192.168.1.1'
        }
      },
      {
        // Active cart for returning customer
        user_id: users[1]?.id || null,
        customer_id: customers[1]?.id || null,
        channel_id: defaultChannel?.id || null,
        currency_id: defaultCurrency?.id || null,
        coupon_code: null,
        completed_at: null,
        meta: {
          device: 'mobile',
          user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X)',
          ip_address: '192.168.1.2'
        }
      },
      {
        // Guest cart (no user or customer)
        user_id: null,
        customer_id: null,
        channel_id: defaultChannel?.id || null,
        currency_id: defaultCurrency?.id || null,
        coupon_code: null,
        completed_at: null,
        meta: {
          device: 'tablet',
          user_agent: 'Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X)',
          ip_address: '192.168.1.3',
          guest_session_id: 'guest-session-123456789'
        }
      },
      {
        // Abandoned cart
        user_id: users[2]?.id || null,
        customer_id: customers[2]?.id || null,
        channel_id: defaultChannel?.id || null,
        currency_id: defaultCurrency?.id || null,
        coupon_code: 'WELCOME10',
        completed_at: null,
        meta: {
          device: 'desktop',
          user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          ip_address: '192.168.1.4',
          last_activity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
        }
      }
    ];

    // Create carts
    const createdCarts = [];
    for (const cartData of sampleCarts) {
      const cart = await models.Cart.create(cartData);
      createdCarts.push(cart);
      
      // Create cart lines for each cart
      const numCartLines = Math.floor(Math.random() * 3) + 1; // 1-3 lines per cart
      
      for (let i = 0; i < numCartLines; i++) {
        const randomVariantIndex = Math.floor(Math.random() * variants.length);
        const variant = variants[randomVariantIndex];
        const quantity = Math.floor(Math.random() * 5) + 1; // 1-5 items
        
        // Pricing from variant attribute data
        const variantPrice = variant.attribute_data?.price || 19.99;
        
        const cartLine = await models.CartLine.create({
          cart_id: cart.id,
          purchasable_type: 'ProductVariant',
          purchasable_id: variant.id,
          quantity: quantity,
          line_total: quantity * variantPrice,
          unit_price: variantPrice,
          unit_quantity: variant.unit_quantity || 1,
          meta: {
            product_name: variant.sku,
            variant_options: JSON.stringify(variant.attribute_data || {})
          }
        });
        
        // Add discount to some cart lines
        if (discounts.length > 0 && Math.random() > 0.7) { // 30% chance
          const randomDiscountIndex = Math.floor(Math.random() * discounts.length);
          const discount = discounts[randomDiscountIndex];
          
          // Apply discount
          await models.CartLineDiscount.create({
            cart_line_id: cartLine.id,
            discount_id: discount.id,
            amount: discount.type === 'percentage' 
              ? cartLine.line_total * (discount.value / 100)
              : Math.min(discount.value, cartLine.line_total)
          });
        }
      }
    }

    console.log(`Created ${createdCarts.length} sample carts with items.`);
  } catch (error) {
    console.error('Error creating sample carts:', error);
    throw error;
  }
};

export default createSampleCarts; 