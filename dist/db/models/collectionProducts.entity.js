import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CollectionProduct extends Model {
}
CollectionProduct.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    collection_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_collections', key: 'id' } },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_collection_product',
    modelName: 'CollectionProduct',
    timestamps: true,
    underscored: false,
});
export default CollectionProduct;
