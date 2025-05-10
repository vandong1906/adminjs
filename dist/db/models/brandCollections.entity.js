import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class BrandCollection extends Model {
}
BrandCollection.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    brand_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_brands', key: 'id' } },
    collection_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_collections', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_brand_collection',
    modelName: 'BrandCollection',
    timestamps: true,
    underscored: false,
});
export default BrandCollection;
