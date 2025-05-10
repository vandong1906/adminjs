import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
class Url extends Model {
}
Url.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    element_type: { type: DataTypes.STRING(255), allowNull: false },
    element_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    language_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_languages', key: 'id' } },
    default: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    slug: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_urls',
    modelName: 'Url',
    timestamps: true,
    underscored: false,
});
export default Url;
