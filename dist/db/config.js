import { Sequelize } from 'sequelize';
const db = {
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DATABASE_PASSWORD || "luanvan",
};
const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: 'mysql',
});
console.log('Connecting to database...', db.database, db.user, db.password, db.host);
export default sequelize;
