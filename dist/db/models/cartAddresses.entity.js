import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CartAddress extends Model {
}
CartAddress.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    cart_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_carts', key: 'id' } },
    country_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_countries', key: 'id' } },
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
    type: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'shipping' },
    shipping_option: { type: DataTypes.STRING(255), allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_cart_addresses',
    modelName: 'CartAddress',
    timestamps: true,
    underscored: false,
});
export default CartAddress;
