import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const db = {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'movie',
};
console.log(db);
const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'mysql',
});
export default sequelize;
