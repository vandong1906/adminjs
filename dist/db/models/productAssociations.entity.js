import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class ProductAssociation extends Model {
}
ProductAssociation.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_parent_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    product_target_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    type: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_product_associations',
    modelName: 'ProductAssociation',
    timestamps: true,
    underscored: false,
});
export default ProductAssociation;
