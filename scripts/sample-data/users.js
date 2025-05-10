import { models } from '../../src/db/models/association.js';
import bcrypt from 'bcrypt';

const createSampleUsers = async () => {
  try {
    console.log('Creating sample users...');

    // Sample user data
    const sampleUsers = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('password123', 10),
        is_admin: true,
        email_verified_at: new Date(),
      },
      {
        name: 'Customer Service',
        email: 'service@example.com',
        password: await bcrypt.hash('password123', 10),
        is_admin: false,
        email_verified_at: new Date(),
      },
      {
        name: 'Test User',
        email: 'user@example.com',
        password: await bcrypt.hash('password123', 10),
        is_admin: false,
        email_verified_at: new Date(),
      }
    ];

    // Check if users already exist
    const existingUsers = await models.User.count();
    if (existingUsers > 0) {
      console.log(`Found ${existingUsers} existing users. Skipping user creation.`);
      return;
    }

    // Create users
    const createdUsers = await Promise.all(
      sampleUsers.map(userData => models.User.create(userData))
    );

    console.log(`Created ${createdUsers.length} sample users.`);
  } catch (error) {
    console.error('Error creating sample users:', error);
    throw error;
  }
};

export default createSampleUsers; 