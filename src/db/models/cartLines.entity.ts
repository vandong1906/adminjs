import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICartLine {
  id: number;
  cart_id: number;
  purchasable_type: string;
  purchasable_id: number;
  quantity: number;
  meta: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CartLineCreationAttributes = Optional<ICartLine, 'id'>;

export class CartLine extends Model<ICartLine, CartLineCreationAttributes> {
  declare id: number;
  declare cart_id: number;
  declare purchasable_type: string;
  declare purchasable_id: number;
  declare quantity: number;
  declare meta: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CartLine.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    cart_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_carts', key: 'id' } },
    purchasable_type: { type: DataTypes.STRING(255), allowNull: false },
    purchasable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    meta: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_cart_lines',
    modelName: 'CartLine',
    timestamps: true,
    underscored: false,
  }
);

export default CartLine;