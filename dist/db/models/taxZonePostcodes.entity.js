import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class TaxZonePostcode extends Model {
}
TaxZonePostcode.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tax_zone_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tax_zones', key: 'id' } },
    country_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_countries', key: 'id' } },
    postcode: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_tax_zone_postcodes',
    modelName: 'TaxZonePostcode',
    timestamps: true,
    underscored: false,
});
export default TaxZonePostcode;
