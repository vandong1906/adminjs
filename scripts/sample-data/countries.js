import Country from '../../src/db/models/countries.entity.js';

const createSampleCountries = async () => {
  console.log('Seeding countries...');
  const countries = [
    {
      name: 'United States',
      iso3: 'USA',
      iso2: 'US',
      phonecode: '1',
      capital: 'Washington, D.C.',
      currency: 'USD',
      native: 'United States',
      emoji: '🇺🇸',
      emoji_u: 'U+1F1FA U+1F1F8',
    },
    {
      name: 'Canada',
      iso3: 'CAN',
      iso2: 'CA',
      phonecode: '1',
      capital: 'Ottawa',
      currency: 'CAD',
      native: 'Canada',
      emoji: '🇨🇦',
      emoji_u: 'U+1F1E8 U+1F1E6',
    },
    {
      name: 'United Kingdom',
      iso3: 'GBR',
      iso2: 'GB',
      phonecode: '44',
      capital: 'London',
      currency: 'GBP',
      native: 'United Kingdom',
      emoji: '🇬🇧',
      emoji_u: 'U+1F1EC U+1F1E7',
    },
    {
      name: 'Australia',
      iso3: 'AUS',
      iso2: 'AU',
      phonecode: '61',
      capital: 'Canberra',
      currency: 'AUD',
      native: 'Australia',
      emoji: '🇦🇺',
      emoji_u: 'U+1F1E6 U+1F1FA',
    },
    {
      name: 'Germany',
      iso3: 'DEU',
      iso2: 'DE',
      phonecode: '49',
      capital: 'Berlin',
      currency: 'EUR',
      native: 'Deutschland',
      emoji: '🇩🇪',
      emoji_u: 'U+1F1E9 U+1F1EA',
    },
  ];

  for (const country of countries) {
    await Country.create(country);
  }

  console.log('Countries seeded successfully!');
};

export default createSampleCountries;