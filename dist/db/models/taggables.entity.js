import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Taggable extends Model {
}
Taggable.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tag_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tags', key: 'id' } },
    taggable_type: { type: DataTypes.STRING(255), allowNull: false },
    taggable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_taggables',
    modelName: 'Taggable',
    timestamps: true,
    underscored: false,
});
export default Taggable;
