import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IDiscountUser {
  id: number;
  discount_id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DiscountUserCreationAttributes = Optional<IDiscountUser, 'id'>;

export class DiscountUser extends Model<IDiscountUser, DiscountUserCreationAttributes> {
  declare id: number;
  declare discount_id: number;
  declare user_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

DiscountUser.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_discounts', key: 'id' } },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_discount_user',
    modelName: 'DiscountUser',
    timestamps: true,
    underscored: false,
  }
);
export default DiscountUser;