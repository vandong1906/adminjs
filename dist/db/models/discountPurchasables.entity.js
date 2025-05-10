import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class DiscountPurchasable extends Model {
}
DiscountPurchasable.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_discounts', key: 'id' } },
    purchasable_type: { type: DataTypes.STRING(255), allowNull: false },
    purchasable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    type: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'limitation' },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_discount_purchasables',
    modelName: 'DiscountPurchasable',
    timestamps: true,
    underscored: false,
});
export default DiscountPurchasable;
