import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CollectionGroup extends Model {
}
CollectionGroup.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    handle: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_collection_groups',
    modelName: 'CollectionGroup',
    timestamps: true,
    underscored: false,
});
export default CollectionGroup;
