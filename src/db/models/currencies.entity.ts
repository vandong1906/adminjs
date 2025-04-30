import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICurrency {
  id: number;
  code: string;
  name: string;
  enabled: boolean;
  exchange_rate: number;
  format: string;
  decimal_point: string;
  thousand_point: string;
  decimal_places: number;
  default: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CurrencyCreationAttributes = Optional<ICurrency, 'id'>;

export class Currency extends Model<ICurrency, CurrencyCreationAttributes> {
  declare id: number;
  declare code: string;
  declare name: string;
  declare enabled: boolean;
  declare exchange_rate: number;
  declare format: string;
  declare decimal_point: string;
  declare thousand_point: string;
  declare decimal_places: number;
  declare default: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Currency.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING(255), allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    exchange_rate: { type: DataTypes.FLOAT, allowNull: false },
    format: { type: DataTypes.STRING(255), allowNull: false },
    decimal_point: { type: DataTypes.STRING(255), allowNull: false },
    thousand_point: { type: DataTypes.STRING(255), allowNull: false },
    decimal_places: { type: DataTypes.INTEGER, allowNull: false },
    default: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_currencies',
    modelName: 'Currency',
    timestamps: true,
    underscored: false,
  }
);

export default Currency;