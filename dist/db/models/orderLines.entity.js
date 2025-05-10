import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class OrderLine extends Model {
}
OrderLine.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_orders', key: 'id' } },
    purchasable_type: { type: DataTypes.STRING(255), allowNull: false },
    purchasable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    type: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: false },
    option: { type: DataTypes.STRING(255), allowNull: true },
    identifier: { type: DataTypes.STRING(255), allowNull: false },
    unit_price: { type: DataTypes.INTEGER, allowNull: false },
    unit_quantity: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    sub_total: { type: DataTypes.INTEGER, allowNull: false },
    discount_total: { type: DataTypes.INTEGER, allowNull: false },
    tax_breakdown: { type: DataTypes.JSON, allowNull: true },
    tax_total: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.INTEGER, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_order_lines',
    modelName: 'OrderLine',
    timestamps: true,
    underscored: false,
});
export default OrderLine;
