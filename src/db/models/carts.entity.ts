import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICart {
  id: number;
  customer_id?: number;
  merged_id?: number;
  currency_id?: number;
  channel_id?: number;
  order_id?: number;
  coupon_code?: string;
  completed_at?: Date;
  meta?: object;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type CartCreationAttributes = Optional<ICart, 'id'>;

export class Cart extends Model<ICart, CartCreationAttributes> {
  declare id: number;
  declare customer_id?: number;
  declare merged_id?: number;
  declare currency_id?: number;
  declare channel_id?: number;
  declare order_id?: number;
  declare coupon_code?: string;
  declare completed_at?: Date;
  declare meta?: object;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare deletedAt?: Date;
}

Cart.init(
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
    merged_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    currency_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true, // Changed to allow NULL to match ON DELETE SET NULL
    },
    channel_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true, // Changed to allow NULL to match ON DELETE SET NULL
    },
    order_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    coupon_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    completed_at: {
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'lunar_carts',
    modelName: 'Cart',
    timestamps: true,
    paranoid: true, // Enable soft deletes for deletedAt
    underscored: false,
  }
);

export default Cart;