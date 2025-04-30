import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IDiscount {
  id: number;
  name: string;
  handle: string;
  type: string;
  starts_at: Date;
  ends_at: Date | null;
  priority: number;
  stop: boolean;
  data: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type DiscountCreationAttributes = Optional<IDiscount, 'id'>;

export class Discount extends Model<IDiscount, DiscountCreationAttributes> {
  declare id: number;
  declare name: string;
  declare handle: string;
  declare type: string;
  declare starts_at: Date;
  declare ends_at: Date | null;
  declare priority: number;
  declare stop: boolean;
  declare data: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Discount.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    handle: { type: DataTypes.STRING(255), allowNull: false },
    type: { type: DataTypes.STRING(255), allowNull: false },
    starts_at: { type: DataTypes.DATE, allowNull: false },
    ends_at: { type: DataTypes.DATE, allowNull: true },
    priority: { type: DataTypes.INTEGER, allowNull: false },
    stop: { type: DataTypes.BOOLEAN, allowNull: false },
    data: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_discounts',
    modelName: 'Discount',
    timestamps: true,
    underscored: false,
  }
);

export default Discount;