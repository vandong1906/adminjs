import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class TaxZoneCountry extends Model {
}
TaxZoneCountry.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tax_zone_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tax_zones', key: 'id' } },
    country_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_countries', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_tax_zone_countries',
    modelName: 'TaxZoneCountry',
    timestamps: true,
    underscored: false,
});
export default TaxZoneCountry;
