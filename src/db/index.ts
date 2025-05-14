import { Database, Resource } from '@adminjs/sequelize';
import AdminJS from 'adminjs';

import { sequelize } from './models/association.js';

AdminJS.registerAdapter({
  Database,
  Resource,
});

const initialize = async () => {
  try {
    // Wait for database sync to complete
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync all models
    await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
    console.log('Database models synchronized successfully.');

    return { sequelize };
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error; // Re-throw to prevent app from starting with broken DB connection
  }
};

export default initialize;
