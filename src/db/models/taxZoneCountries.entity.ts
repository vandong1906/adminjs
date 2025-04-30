import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ITaxZoneCountry {
  id: number;
  tax_zone_id: number;
  country_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TaxZoneCountryCreationAttributes = Optional<ITaxZoneCountry, 'id'>;

export class TaxZoneCountry extends Model<ITaxZoneCountry, TaxZoneCountryCreationAttributes> {
  declare id: number;
  declare tax_zone_id: number;
  declare country_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

TaxZoneCountry.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tax_zone_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tax_zones', key: 'id' } },
    country_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_countries', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_tax_zone_countries',
    modelName: 'TaxZoneCountry',
    timestamps: true,
    underscored: false,
  }
);
export default TaxZoneCountry;