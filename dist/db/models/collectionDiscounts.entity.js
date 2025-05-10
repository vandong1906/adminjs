import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CollectionDiscount extends Model {
}
CollectionDiscount.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    collection_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    type: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'limitation' },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_collection_discount',
    modelName: 'CollectionDiscount',
    timestamps: true,
    underscored: false,
});
export default CollectionDiscount;
