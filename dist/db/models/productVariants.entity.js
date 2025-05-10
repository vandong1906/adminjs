import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class ProductVariant extends Model {
}
ProductVariant.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    tax_class_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_tax_classes', key: 'id' } },
    sku: { type: DataTypes.STRING(255), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    unit_quantity: { type: DataTypes.INTEGER, allowNull: false },
    backorder: { type: DataTypes.INTEGER, allowNull: true },
    purchasable: { type: DataTypes.STRING(255), allowNull: false },
    attribute_data: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_product_variants',
    modelName: 'ProductVariant',
    timestamps: true,
    underscored: false,
});
export default ProductVariant;
