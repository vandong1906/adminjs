import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICustomerDiscount {
  id: number;
  customer_id: number;
  discount_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerDiscountCreationAttributes = Optional<ICustomerDiscount, 'id'>;

export class CustomerDiscount extends Model<ICustomerDiscount, CustomerDiscountCreationAttributes> {
  declare id: number;
  declare customer_id: number;
  declare discount_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CustomerDiscount.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_customers', key: 'id' } },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_discounts', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_customer_discount',
    modelName: 'CustomerDiscount',
    timestamps: true,
    underscored: false,
  }
);

export default CustomerDiscount;