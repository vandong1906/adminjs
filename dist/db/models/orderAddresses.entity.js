import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class OrderAddress extends Model {
}
OrderAddress.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: { model: 'lunar_orders', key: 'id' },
        onDelete: 'CASCADE'
    },
    country_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: { model: 'lunar_countries', key: 'id' },
        onDelete: 'SET NULL'
    },
    title: { type: DataTypes.STRING(255), allowNull: true },
    first_name: { type: DataTypes.STRING(255), allowNull: true },
    last_name: { type: DataTypes.STRING(255), allowNull: true },
    company_name: { type: DataTypes.STRING(255), allowNull: true },
    line_one: { type: DataTypes.STRING(255), allowNull: true },
    line_two: { type: DataTypes.STRING(255), allowNull: true },
    line_three: { type: DataTypes.STRING(255), allowNull: true },
    city: { type: DataTypes.STRING(255), allowNull: true },
    state: { type: DataTypes.STRING(255), allowNull: true },
    postcode: { type: DataTypes.STRING(255), allowNull: true },
    delivery_instructions: { type: DataTypes.STRING(255), allowNull: true },
    contact_email: { type: DataTypes.STRING(255), allowNull: true },
    contact_phone: { type: DataTypes.STRING(255), allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    type: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'shipping' },
    shipping_option: { type: DataTypes.STRING(255), allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_order_addresses',
    modelName: 'OrderAddress',
    timestamps: true,
    underscored: false,
});
export default OrderAddress;
