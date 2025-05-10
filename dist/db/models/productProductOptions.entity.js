import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class ProductProductOption extends Model {
}
ProductProductOption.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    product_option_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_product_options', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_product_product_option',
    modelName: 'ProductProductOption',
    timestamps: true,
    underscored: false,
});
export default ProductProductOption;
