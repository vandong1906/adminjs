import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ITaxZone {
  id: number;
  name: string;
  zone_type: string;
  price_display: string;
  active: boolean;
  default: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TaxZoneCreationAttributes = Optional<ITaxZone, 'id'>;

export class TaxZone extends Model<ITaxZone, TaxZoneCreationAttributes> {
  declare id: number;
  declare name: string;
  declare zone_type: string;
  declare price_display: string;
  declare active: boolean;
  declare default: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

TaxZone.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    zone_type: { type: DataTypes.STRING(255), allowNull: false },
    price_display: { type: DataTypes.STRING(255), allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false },
    default: { type: DataTypes.BOOLEAN, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_tax_zones',
    modelName: 'TaxZone',
    timestamps: true,
    underscored: false,
  }
);
export default TaxZone;