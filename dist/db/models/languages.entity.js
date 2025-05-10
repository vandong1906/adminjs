import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Language extends Model {
}
Language.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING(255), allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    default: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_languages',
    modelName: 'Language',
    timestamps: true,
    underscored: false,
});
export default Language;
