import { models } from '../../src/db/models/association.js';

const createSampleCurrencies = async () => {
  try {
    console.log('Creating sample currencies...');

    // Sample currency data
    const sampleCurrencies = [
      {
        code: 'USD',
        name: 'US Dollar',
        exchange_rate: 1,
        format: '${price}',
        decimal_point: '.',
        thousand_separator: ',',
        decimal_places: 2,
        thousand_point: ',',
        default: true,
      },
      {
        code: 'EUR',
        name: 'Euro',
        exchange_rate: 0.85,
        format: '€{price}',
        decimal_point: ',',
        thousand_separator: '.',
        decimal_places: 2,
        thousand_point: '.',
        default: false,
      },
      {
        code: 'GBP',
        name: 'British Pound',
        exchange_rate: 0.73,
        format: '£{price}',
        decimal_point: '.',
        thousand_separator: ',',
        decimal_places: 2,
        thousand_point: ',',
        default: false,
      },
      {
        code: 'VND',
        name: 'Vietnamese Dong',
        exchange_rate: 24300,
        format: '{price}₫',
        decimal_point: ',',
        thousand_separator: '.',
        decimal_places: 0,
        thousand_point: '.',
        default: false,
      }
    ];

    // Check if currencies already exist
    const existingCurrencies = await models.Currency.count();
    if (existingCurrencies > 0) {
      console.log(`Found ${existingCurrencies} existing currencies. Skipping currency creation.`);
      return;
    }

    // Create currencies
    const createdCurrencies = await Promise.all(
      sampleCurrencies.map(currencyData => models.Currency.create(currencyData))
    );

    console.log(`Created ${createdCurrencies.length} sample currencies.`);
  } catch (error) {
    console.error('Error creating sample currencies:', error);
    throw error;
  }
};

export default createSampleCurrencies; 