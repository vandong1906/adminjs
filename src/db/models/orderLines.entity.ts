import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IOrderLine {
  id: number;
  order_id: number;
  purchasable_type: string;
  purchasable_id: number;
  type: string;
  description: string;
  option: string | null;
  identifier: string;
  unit_price: number;
  unit_quantity: number;
  quantity: number;
  sub_total: number;
  discount_total: number;
  tax_breakdown: object | null;
  tax_total: number;
  total: number;
  notes: string | null;
  meta: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderLineCreationAttributes = Optional<IOrderLine, 'id'>;

export class OrderLine extends Model<IOrderLine, OrderLineCreationAttributes> {
  declare id: number;
  declare order_id: number;
  declare purchasable_type: string;
  declare purchasable_id: number;
  declare type: string;
  declare description: string;
  declare option: string | null;
  declare identifier: string;
  declare unit_price: number;
  declare unit_quantity: number;
  declare quantity: number;
  declare sub_total: number;
  declare discount_total: number;
  declare tax_breakdown: object | null;
  declare tax_total: number;
  declare total: number;
  declare notes: string | null;
  declare meta: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

OrderLine.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_orders', key: 'id' } },
    purchasable_type: { type: DataTypes.STRING(255), allowNull: false },
    purchasable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    type: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: false },
    option: { type: DataTypes.STRING(255), allowNull: true },
    identifier: { type: DataTypes.STRING(255), allowNull: false },
    unit_price: { type: DataTypes.INTEGER, allowNull: false },
    unit_quantity: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    sub_total: { type: DataTypes.INTEGER, allowNull: false },
    discount_total: { type: DataTypes.INTEGER, allowNull: false },
    tax_breakdown: { type: DataTypes.JSON, allowNull: true },
    tax_total: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.INTEGER, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_order_lines',
    modelName: 'OrderLine',
    timestamps: true,
    underscored: false,
  }
);
export default OrderLine;