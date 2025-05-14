
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IOrder {
  id: number;
  customer_id?: number;
  channel_id?: number;
  status: string;
  reference: string;
  customer_reference?: string;
  sub_total: number;
  discount_total: number;
  shipping_total: number;
  tax_breakdown?: object;
  tax_total: number;
  total: number;
  notes?: string;
  currency_code: string;
  compare_currency_code?: string;
  exchange_rate: number;
  placed_at?: Date;
  meta?: object;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderCreationAttributes = Optional<IOrder, 'id'>;

export class Order extends Model<IOrder, OrderCreationAttributes> {
  declare id: number;

  declare customer_id?: number;
  declare channel_id?: number;
  declare status: string;
  declare reference: string;
  declare customer_reference?: string;
  declare sub_total: number;
  declare discount_total: number;
  declare shipping_total: number;
  declare tax_breakdown?: object;
  declare tax_total: number;
  declare total: number;
  declare notes?: string;
  declare currency_code: string;
  declare compare_currency_code?: string;
  declare exchange_rate: number;
  declare placed_at?: Date;
  declare meta?: object;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    channel_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customer_reference: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sub_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shipping_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tax_breakdown: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    tax_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    currency_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    compare_currency_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    exchange_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    placed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    meta: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'lunar_orders',
    modelName: 'Order',
    timestamps: true,
    underscored: false,
  }
);

export default Order;
