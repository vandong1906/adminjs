import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class ProductType extends Model {
}
ProductType.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_product_types',
    modelName: 'ProductType',
    timestamps: true,
    underscored: false,
});
export default ProductType;
