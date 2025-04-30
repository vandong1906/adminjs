import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICustomerCustomerGroup {
  id: number;
  customer_id: number;
  customer_group_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerCustomerGroupCreationAttributes = Optional<ICustomerCustomerGroup, 'id'>;

export class CustomerCustomerGroup extends Model<ICustomerCustomerGroup, CustomerCustomerGroupCreationAttributes> {
  declare id: number;
  declare customer_id: number;
  declare customer_group_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CustomerCustomerGroup.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_customers', key: 'id' } },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_customer_groups', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_customer_customer_group',
    modelName: 'CustomerCustomerGroup',
    timestamps: true,
    underscored: false,
  }
);

export default CustomerCustomerGroup;