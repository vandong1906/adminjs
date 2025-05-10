import OrderLine from '../../src/db/models/orderLines.entity.js';

const createSampleOrderLines = async () => {
  console.log('Seeding order lines...');
  const orderLines = [
    {
      order_id: 1, // Ensure this ID exists in lunar_orders
      purchasable_type: 'Product',
      purchasable_id: 101,
      type: 'physical',
      description: 'Sample Product 1',
      option: 'Color: Red',
      identifier: 'PROD-101-RED',
      unit_price: 1000,
      unit_quantity: 1,
      quantity: 2,
      sub_total: 2000,
      discount_total: 200,
      tax_breakdown: { VAT: 300 },
      tax_total: 300,
      total: 2100,
      notes: 'Deliver ASAP',
      meta: { giftWrap: true },
    },
    {
      order_id: 2, // Ensure this ID exists in lunar_orders
      purchasable_type: 'Service',
      purchasable_id: 201,
      type: 'service',
      description: 'Sample Service 1',
      option: 'Duration: 1 Hour',
      identifier: 'SERV-201-1H',
      unit_price: 1500,
      unit_quantity: 1,
      quantity: 1,
      sub_total: 1500,
      discount_total: 0,
      tax_breakdown: { VAT: 225 },
      tax_total: 225,
      total: 1725,
      notes: 'Schedule for Monday',
      meta: { priority: 'high' },
    },
  ];

  for (const orderLine of orderLines) {
    await OrderLine.create(orderLine);
  }

  console.log('Order lines seeded successfully!');
};

export default createSampleOrderLines;