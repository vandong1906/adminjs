import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class ProductOptionValue extends Model {
}
ProductOptionValue.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_option_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_product_options', key: 'id' } },
    name: { type: DataTypes.JSON, allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_product_option_values',
    modelName: 'ProductOptionValue',
    timestamps: true,
    underscored: false,
});
export default ProductOptionValue;
