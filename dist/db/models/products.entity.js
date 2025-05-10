import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Product extends Model {
}
Product.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_type_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    status: { type: DataTypes.STRING(255), allowNull: false },
    brand_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, },
    attribute_data: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_products',
    modelName: 'Product',
    timestamps: true,
    underscored: false,
});
export default Product;
