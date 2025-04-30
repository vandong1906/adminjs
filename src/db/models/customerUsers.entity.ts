import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICustomerUser {
  id: number;
  customer_id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerUserCreationAttributes = Optional<ICustomerUser, 'id'>;

export class CustomerUser extends Model<ICustomerUser, CustomerUserCreationAttributes> {
  declare id: number;
  declare customer_id: number;
  declare user_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CustomerUser.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_customers', key: 'id' } },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_customer_user',
    modelName: 'CustomerUser',
    timestamps: true,
    underscored: false,
  }
);

export default CustomerUser;