import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Country extends Model {
}
Country.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    iso3: { type: DataTypes.STRING(255), allowNull: false },
    iso2: { type: DataTypes.STRING(255), allowNull: true },
    phonecode: { type: DataTypes.STRING(255), allowNull: false },
    capital: { type: DataTypes.STRING(255), allowNull: true },
    currency: { type: DataTypes.STRING(255), allowNull: false },
    native: { type: DataTypes.STRING(255), allowNull: true },
    emoji: { type: DataTypes.STRING(255), allowNull: false },
    emoji_u: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_countries',
    modelName: 'Country',
    timestamps: true,
    underscored: false,
});
export default Country;
