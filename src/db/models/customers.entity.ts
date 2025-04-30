import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICustomer {
  id: number;
  title: string | null;
  first_name: string;
  last_name: string;
  company_name: string | null;
  vat_no: string | null;
  attribute_data: object | null;
  meta: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerCreationAttributes = Optional<ICustomer, 'id'>;

export class Customer extends Model<ICustomer, CustomerCreationAttributes> {
  declare id: number;
  declare title: string | null;
  declare first_name: string;
  declare last_name: string;
  declare company_name: string | null;
  declare vat_no: string | null;
  declare attribute_data: object | null;
  declare meta: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Customer.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: true },
    first_name: { type: DataTypes.STRING(255), allowNull: false },
    last_name: { type: DataTypes.STRING(255), allowNull: false },
    company_name: { type: DataTypes.STRING(255), allowNull: true },
    vat_no: { type: DataTypes.STRING(255), allowNull: true },
    attribute_data: { type: DataTypes.JSON, allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_customers',
    modelName: 'Customer',
    timestamps: true,
    underscored: false,
  }
);

export default Customer;