import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICustomerGroupDiscount {
  id: number;
  customer_group_id: number;
  discount_id: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerGroupDiscountCreationAttributes = Optional<ICustomerGroupDiscount, 'id'>;

export class CustomerGroupDiscount extends Model<ICustomerGroupDiscount, CustomerGroupDiscountCreationAttributes> {
  declare id: number;
  declare customer_group_id: number;
  declare discount_id: number;
  declare type: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CustomerGroupDiscount.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_customer_groups', key: 'id' } },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_discounts', key: 'id' } },
    type: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'limitation' },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_customer_group_discount',
    modelName: 'CustomerGroupDiscount',
    timestamps: true,
    underscored: false,
  }
);

export default CustomerGroupDiscount;