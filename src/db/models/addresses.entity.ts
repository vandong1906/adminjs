import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IAddress {
  id: number;
  customer_id: number | null;
  country_id: number | null;
  title: string | null;
  first_name: string;
  last_name: string;
  company_name: string | null;
  line_one: string;
  line_two: string | null;
  line_three: string | null;
  city: string;
  state: string | null;
  postcode: string | null;
  delivery_instructions: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  meta: object | null;
  shipping_default: boolean;
  billing_default: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AddressCreationAttributes = Optional<IAddress, 'id'>;

export class Address extends Model<IAddress, AddressCreationAttributes> {
  declare id: number;
  declare customer_id: number | null;
  declare country_id: number | null;
  declare title: string | null;
  declare first_name: string;
  declare last_name: string;
  declare company_name: string | null;
  declare line_one: string;
  declare line_two: string | null;
  declare line_three: string | null;
  declare city: string;
  declare state: string | null;
  declare postcode: string | null;
  declare delivery_instructions: string | null;
  declare contact_email: string | null;
  declare contact_phone: string | null;
  declare meta: object | null;
  declare shipping_default: boolean;
  declare billing_default: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Address.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_customers', key: 'id' } },
    country_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_countries', key: 'id' } },
    title: { type: DataTypes.STRING(255), allowNull: true },
    first_name: { type: DataTypes.STRING(255), allowNull: false },
    last_name: { type: DataTypes.STRING(255), allowNull: false },
    company_name: { type: DataTypes.STRING(255), allowNull: true },
    line_one: { type: DataTypes.STRING(255), allowNull: false },
    line_two: { type: DataTypes.STRING(255), allowNull: true },
    line_three: { type: DataTypes.STRING(255), allowNull: true },
    city: { type: DataTypes.STRING(255), allowNull: false },
    state: { type: DataTypes.STRING(255), allowNull: true },
    postcode: { type: DataTypes.STRING(255), allowNull: true },
    delivery_instructions: { type: DataTypes.STRING(255), allowNull: true },
    contact_email: { type: DataTypes.STRING(255), allowNull: true },
    contact_phone: { type: DataTypes.STRING(255), allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    shipping_default: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    billing_default: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_addresses',
    modelName: 'Address',
    timestamps: true,
    underscored: false,
  }
);

export default Address;