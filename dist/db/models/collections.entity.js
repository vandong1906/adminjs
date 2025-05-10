import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Collection extends Model {
}
Collection.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    collection_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_collection_groups', key: 'id' } },
    _lft: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    _rgt: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    parent_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    type: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'static' },
    attribute_data: { type: DataTypes.JSON, allowNull: false },
    sort: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'custom' },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_collections',
    modelName: 'Collection',
    timestamps: true,
    paranoid: true,
    underscored: true,
});
export default Collection;
