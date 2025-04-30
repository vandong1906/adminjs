import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICustomerCustomerGroup {
  id: number;
  customer_id: number;
  customer_group_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CustomerCustomerGroupCreationAttributes = Optional<ICustomerCustomerGroup, 'id'>;

export class CustomerCustomerGroup extends Model<ICustomerCustomerGroup, CustomerCustomerGroupCreationAttributes> {
  declare id: number;
  declare customer_id: number;
  declare customer_group_id: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

CustomerCustomerGroup.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    customer_group_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
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
    tableName: 'lunar_customer_customer_group',
    modelName: 'CustomerCustomerGroup',
    timestamps: true,
    underscored: false,
    indexes: [
      {
        name: 'cust_cust_group_unique', // Shortened unique index name
        unique: true,
        fields: ['customer_id', 'customer_group_id'],
      },
    ],
  }
);

export default CustomerCustomerGroup;