import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICustomerGroupProduct {
  id: number;
  customer_group_id: number;
  product_id: number;
  enabled: boolean;
  starts_at: Date | null;
  ends_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerGroupProductCreationAttributes = Optional<ICustomerGroupProduct, 'id'>;

export class CustomerGroupProduct extends Model<ICustomerGroupProduct, CustomerGroupProductCreationAttributes> {
  declare id: number;
  declare customer_group_id: number;
  declare product_id: number;
  declare enabled: boolean;
  declare starts_at: Date | null;
  declare ends_at: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CustomerGroupProduct.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_customer_groups', key: 'id' } },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    starts_at: { type: DataTypes.DATE, allowNull: true },
    ends_at: { type: DataTypes.DATE, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_customer_group_product',
    modelName: 'CustomerGroupProduct',
    timestamps: true,
    underscored: false,
  }
);

export default CustomerGroupProduct;