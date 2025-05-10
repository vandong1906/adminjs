import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

export interface IDiscount {
  id: number;
  name: string;
  handle: string;
  type: string;
  code: string;
  value: number;
  min_order_value: number;
  max_uses: number | null;
  used_count: number;
  is_active: boolean;
  starts_at: Date;
  ends_at: Date | null;
  priority: number;
  stop: boolean;
  data: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type DiscountCreationAttributes = Optional<IDiscount, 'id' | 'used_count' | 'createdAt' | 'updatedAt'>;

export class Discount extends Model<IDiscount, DiscountCreationAttributes> {
  declare id: number;
  declare name: string;
  declare handle: string;
  declare type: string;
  declare code: string;
  declare value: number;
  declare min_order_value: number;
  declare max_uses: number | null;
  declare used_count: number;
  declare is_active: boolean;
  declare starts_at: Date;
  declare ends_at: Date | null;
  declare priority: number;
  declare stop: boolean;
  declare data: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
  
  // Virtual fields for associations
  declare customerGroups?: any[];
  declare products?: any[];
  declare collections?: any[];
}

Discount.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    handle: { type: DataTypes.STRING(255), allowNull: false },
    type: { type: DataTypes.STRING(255), allowNull: false },
    code: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    value: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    min_order_value: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    max_uses: { type: DataTypes.INTEGER, allowNull: true },
    used_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    starts_at: { type: DataTypes.DATE, allowNull: false },
    ends_at: { type: DataTypes.DATE, allowNull: true },
    priority: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    stop: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
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