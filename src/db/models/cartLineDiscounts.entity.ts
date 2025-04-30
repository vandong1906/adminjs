import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICartLineDiscount {
  id: number;
  cart_line_id: number;
  discount_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CartLineDiscountCreationAttributes = Optional<ICartLineDiscount, 'id'>;

export class CartLineDiscount extends Model<ICartLineDiscount, CartLineDiscountCreationAttributes> {
  declare id: number;
  declare cart_line_id: number;
  declare discount_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CartLineDiscount.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    cart_line_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_cart_lines', key: 'id' } },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_discounts', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_cart_line_discount',
    modelName: 'CartLineDiscount',
    timestamps: true,
    underscored: false,
  }
);

export default CartLineDiscount;