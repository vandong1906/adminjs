import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Tag extends Model {
}
Tag.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING(255), allowNull: false },
    value: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_tags',
    modelName: 'Tag',
    timestamps: true,
    underscored: false,
});
export default Tag;
