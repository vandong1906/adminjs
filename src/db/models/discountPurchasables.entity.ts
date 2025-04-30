import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IDiscountPurchasable {
  id: number;
  discount_id: number;
  purchasable_type: string;
  purchasable_id: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DiscountPurchasableCreationAttributes = Optional<IDiscountPurchasable, 'id'>;

export class DiscountPurchasable extends Model<IDiscountPurchasable, DiscountPurchasableCreationAttributes> {
  declare id: number;
  declare discount_id: number;
  declare purchasable_type: string;
  declare purchasable_id: number;
  declare type: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

DiscountPurchasable.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_discounts', key: 'id' } },
    purchasable_type: { type: DataTypes.STRING(255), allowNull: false },
    purchasable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    type: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'limitation' },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_discount_purchasables',
    modelName: 'DiscountPurchasable',
    timestamps: true,
    underscored: false,
  }
);

export default DiscountPurchasable;