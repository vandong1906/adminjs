import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class BrandDiscount extends Model {
}
BrandDiscount.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    brand_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_brands', key: 'id' } },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_discounts', key: 'id' } },
    type: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'limitation' },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_brand_discount',
    modelName: 'BrandDiscount',
    timestamps: true,
    underscored: false,
});
export default BrandDiscount;
