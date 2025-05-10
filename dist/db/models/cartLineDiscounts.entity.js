import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CartLineDiscount extends Model {
}
CartLineDiscount.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    cart_line_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_cart_lines', key: 'id' } },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_discounts', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_cart_line_discount',
    modelName: 'CartLineDiscount',
    timestamps: true,
    underscored: false,
});
export default CartLineDiscount;
