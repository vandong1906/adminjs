import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class ProductOptionValueProductVariant extends Model {
}
ProductOptionValueProductVariant.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    value_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_product_option_values', key: 'id' } },
    variant_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_product_variants', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_product_option_value_product_variant',
    modelName: 'ProductOptionValueProductVariant',
    timestamps: true,
    underscored: false,
});
export default ProductOptionValueProductVariant;
