import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IPrice {
  id: number;
  currency_id: number;
  customer_group_id: number | null;
  priceable_type: string;
  priceable_id: number;
  price: number;
  compare_price: number | null;
  tier: number;
  meta: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type PriceCreationAttributes = Optional<IPrice, 'id'>;

export class Price extends Model<IPrice, PriceCreationAttributes> {
  declare id: number;
  declare currency_id: number;
  declare customer_group_id: number | null;
  declare priceable_type: string;
  declare priceable_id: number;
  declare price: number;
  declare compare_price: number | null;
  declare tier: number;
  declare meta: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Price.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    currency_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_currencies', key: 'id' } },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_customer_groups', key: 'id' } },
    priceable_type: { type: DataTypes.STRING(255), allowNull: false },
    priceable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    compare_price: { type: DataTypes.INTEGER, allowNull: true },
    tier: { type: DataTypes.INTEGER, allowNull: false },
    meta: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_prices',
    modelName: 'Price',
    timestamps: true,
    underscored: false,
  }
);
export default Price;