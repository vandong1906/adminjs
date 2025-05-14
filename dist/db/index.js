import { Database, Resource } from '@adminjs/sequelize';
import AdminJS from 'adminjs';
import { sequelize } from './models/association.js';
AdminJS.registerAdapter({
    Database,
    Resource,
});
const initialize = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
        console.log('Database models synchronized successfully.');
        return { sequelize };
    }
    catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
};
export default initialize;
