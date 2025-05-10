import { models } from '../../src/db/models/association.js';

const createSampleChannels = async () => {
  try {
    console.log('Creating sample channels...');

    // Sample channel data
    const sampleChannels = [
      {
        name: 'Web Store',
        handle: 'web-store',
        default: true,
        url: 'https://example.com',
      },
      {
        name: 'Mobile App',
        handle: 'mobile-app',
        default: false,
        url: 'app://example.com',
      },
      {
        name: 'Physical Store',
        handle: 'physical-store',
        default: false,
        url: null,
      }
    ];

    // Check if channels already exist
    const existingChannels = await models.Channel.count();
    if (existingChannels > 0) {
      console.log(`Found ${existingChannels} existing channels. Skipping channel creation.`);
      return;
    }

    // Create channels
    const createdChannels = await Promise.all(
      sampleChannels.map(channelData => models.Channel.create(channelData))
    );

    console.log(`Created ${createdChannels.length} sample channels.`);
  } catch (error) {
    console.error('Error creating sample channels:', error);
    throw error;
  }
};

export default createSampleChannels; 