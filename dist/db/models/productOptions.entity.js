import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class ProductOption extends Model {
}
ProductOption.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.JSON, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_product_options',
    modelName: 'ProductOption',
    timestamps: true,
    underscored: false,
});
export default ProductOption;
