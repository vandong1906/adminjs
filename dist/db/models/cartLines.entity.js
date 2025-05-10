import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CartLine extends Model {
}
CartLine.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    cart_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_carts', key: 'id' } },
    purchasable_type: { type: DataTypes.STRING(255), allowNull: false },
    purchasable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    meta: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_cart_lines',
    modelName: 'CartLine',
    timestamps: true,
    underscored: false,
});
export default CartLine;
