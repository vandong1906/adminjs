import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Order extends Model {
}
Order.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    channel_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    reference: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    customer_reference: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    sub_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discount_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shipping_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tax_breakdown: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    tax_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    currency_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    compare_currency_code: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    exchange_rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    placed_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    meta: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'lunar_orders',
    modelName: 'Order',
    timestamps: true,
    underscored: false,
});
export default Order;
