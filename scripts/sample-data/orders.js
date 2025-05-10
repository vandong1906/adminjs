import { models } from '../../src/db/models/association.js';

const createSampleOrders = async () => {
  try {
    console.log('Creating sample orders...');

    // Get necessary data for foreign keys
    const customers = await models.Customer.findAll();
    const users = await models.User.findAll();
    const channels = await models.Channel.findAll();
    const variants = await models.ProductVariant.findAll();
    const countries = await models.Country.findAll();
    
    if (customers.length === 0 || variants.length === 0) {
      console.log('No customers or product variants found. Please create them first.');
      return;
    }

    const defaultChannel = channels.find(c => c.default) || channels[0];
    const defaultCountry = countries[0];

    // Check if orders already exist
    const existingOrders = await models.Order.count();
    if (existingOrders > 0) {
      console.log(`Found ${existingOrders} existing orders. Skipping order creation.`);
      return;
    }

    // Sample order statuses
    const statuses = ['pending', 'processing', 'completed', 'cancelled', 'refunded'];
    
    // Generate a reference number for orders
    const generateReference = () => {
      return 'ORD-' + Date.now().toString().substring(7) + '-' + Math.floor(Math.random() * 10000);
    };

    // Create several sample orders
    const numOrders = 10;
    for (let i = 0; i < numOrders; i++) {
      // Select a random customer and status
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      
      // Calculate a placed date either in the past or null if pending
      let placedAt = null;
      if (status !== 'pending') {
        // Random date from 1-30 days ago
        const daysAgo = Math.floor(Math.random() * 30) + 1;
        placedAt = new Date(Date.now() - (daysAgo * 24 * 60 * 60 * 1000));
      }
      
      // Create order data
      const orderData = {
        customer_id: customer.id,
        user_id: user?.id || null,
        channel_id: defaultChannel?.id || null,
        status: status,
        reference: generateReference(),
        customer_reference: Math.random() > 0.7 ? `PO-${Math.floor(Math.random() * 10000)}` : null,
        sub_total: 0, // Will calculate after adding order lines
        discount_total: 0,
        shipping_total: Math.random() > 0.3 ? 9.99 : 0,
        tax_total: 0, 
        total: 0, 
        notes: Math.random() > 0.7 ? 'Please deliver during business hours.' : null,
        currency_code: 'USD',
        compare_currency_code: '',
        exchange_rate: 1,
        placed_at: placedAt,
        meta: {
          source: 'website',
          ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`,
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      };
      
      // Create the order
      const order = await models.Order.create(orderData);
      
      // Create order addresses
      const shippingAddress = await models.OrderAddress.create({
        order_id: order.id,
        country_id: defaultCountry?.id,
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
        meta: {}
      });
      
      const billingAddress = await models.OrderAddress.create({
        order_id: order.id,
        country_id: defaultCountry?.id,
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
        delivery_instructions: '',
        contact_email: customer.email,
        contact_phone: customer.phone,
        type: 'billing',
        meta: {}
      });
      
      // Create order lines
      const numOrderLines = Math.floor(Math.random() * 3) + 1; // 1-3 lines per order
      let subTotal = 0;
      let taxTotal = 0;
      const taxRate = 0.1; // 10% tax
      
      for (let j = 0; j < numOrderLines; j++) {
        // Select a random variant
        const randomVariantIndex = Math.floor(Math.random() * variants.length);
        const variant = variants[randomVariantIndex];
        const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 items
        
        // Pricing from variant attribute data
        const variantPrice = variant.attribute_data?.price || 19.99;
        const lineTotal = quantity * variantPrice;
        const lineTax = lineTotal * taxRate;
        
        subTotal += lineTotal;
        taxTotal += lineTax;
        
        // Create the order line
        const orderLine = await models.OrderLine.create({
          order_id: order.id,
          purchasable_type: 'ProductVariant',
          purchasable_id: variant.id,
          type: 'physical',
          description: `${variant.sku} - ${variant.attribute_data?.color || 'Standard'} - ${variant.attribute_data?.size || 'One size'}`,
          quantity: quantity,
          line_total: lineTotal,
          unit_price: variantPrice,
          unit_quantity: variant.unit_quantity || 1,
          sub_total: lineTotal,
          discount_total: 0,
          tax_total: lineTax,
          total: lineTotal + lineTax,
          tax_breakdown: JSON.stringify([
            {
              description: 'VAT',
              identifier: 'VAT',
              percentage: 10,
              value: lineTax
            }
          ]),
          meta: {
            variant_options: JSON.stringify(variant.attribute_data || {})
          }
        });
      }
      
      // Calculate order discount
      const discountTotal = Math.random() > 0.7 ? subTotal * 0.1 : 0; // Random 10% discount on some orders
      
      // Calculate final order total
      const total = subTotal - discountTotal + orderData.shipping_total + taxTotal;
      
      // Update the order with calculated totals
      await order.update({
        sub_total: subTotal,
        discount_total: discountTotal,
        tax_total: taxTotal,
        total: total,
        tax_breakdown: JSON.stringify([
          {
            description: 'VAT',
            identifier: 'VAT',
            percentage: 10,
            value: taxTotal
          }
        ])
      });
      
      // Create transaction for completed orders
      if (status === 'completed' || status === 'processing') {
        await models.Transaction.create({
          order_id: order.id,
          type: 'purchase',
          driver: 'stripe',
          amount: total,
          reference: `txn_${Date.now()}${Math.floor(Math.random() * 1000)}`,
          status: 'succeeded',
          currency_code: 'USD',
          card_type: ['visa', 'mastercard', 'amex'][Math.floor(Math.random() * 3)],
          last_four: `${Math.floor(1000 + Math.random() * 9000)}`,
          meta: {
            payment_intent_id: `pi_${Date.now()}`,
            stripe_fee: (total * 0.029 + 0.3).toFixed(2)
          }
        });
      }
    }

    console.log(`Created ${numOrders} sample orders.`);
  } catch (error) {
    console.error('Error creating sample orders:', error);
    throw error;
  }
};

export default createSampleOrders; 