import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Address extends Model {
}
Address.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_customers', key: 'id' } },
    country_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_countries', key: 'id' } },
    title: { type: DataTypes.STRING(255), allowNull: true },
    first_name: { type: DataTypes.STRING(255), allowNull: false },
    last_name: { type: DataTypes.STRING(255), allowNull: false },
    company_name: { type: DataTypes.STRING(255), allowNull: true },
    line_one: { type: DataTypes.STRING(255), allowNull: false },
    line_two: { type: DataTypes.STRING(255), allowNull: true },
    line_three: { type: DataTypes.STRING(255), allowNull: true },
    city: { type: DataTypes.STRING(255), allowNull: false },
    state: { type: DataTypes.STRING(255), allowNull: true },
    postcode: { type: DataTypes.STRING(255), allowNull: true },
    delivery_instructions: { type: DataTypes.STRING(255), allowNull: true },
    contact_email: { type: DataTypes.STRING(255), allowNull: true },
    contact_phone: { type: DataTypes.STRING(255), allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    shipping_default: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    billing_default: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_addresses',
    modelName: 'Address',
    timestamps: true,
    underscored: false,
});
export default Address;
