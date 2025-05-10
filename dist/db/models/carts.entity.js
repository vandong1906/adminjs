import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Cart extends Model {
}
Cart.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    merged_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    currency_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    channel_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    order_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    coupon_code: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    completed_at: {
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
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'lunar_carts',
    modelName: 'Cart',
    timestamps: true,
    paranoid: true,
    underscored: false,
});
export default Cart;
