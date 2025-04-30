import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ITaxZonePostcode {
  id: number;
  tax_zone_id: number;
  country_id: number;
  postcode: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TaxZonePostcodeCreationAttributes = Optional<ITaxZonePostcode, 'id'>;

export class TaxZonePostcode extends Model<ITaxZonePostcode, TaxZonePostcodeCreationAttributes> {
  declare id: number;
  declare tax_zone_id: number;
  declare country_id: number;
  declare postcode: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

TaxZonePostcode.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tax_zone_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tax_zones', key: 'id' } },
    country_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_countries', key: 'id' } },
    postcode: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_tax_zone_postcodes',
    modelName: 'TaxZonePostcode',
    timestamps: true,
    underscored: false,
  }
);
export default TaxZonePostcode;