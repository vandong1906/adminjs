import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICartAddress {
  id: number;
  cart_id: number;
  country_id: number | null;
  title: string | null;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  line_one: string | null;
  line_two: string | null;
  line_three: string | null;
  city: string | null;
  state: string | null;
  postcode: string | null;
  delivery_instructions: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  type: string;
  shipping_option: string | null;
  meta: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CartAddressCreationAttributes = Optional<ICartAddress, 'id'>;

export class CartAddress extends Model<ICartAddress, CartAddressCreationAttributes> {
  declare id: number;
  declare cart_id: number;
  declare country_id: number | null;
  declare title: string | null;
  declare first_name: string | null;
  declare last_name: string | null;
  declare company_name: string | null;
  declare line_one: string | null;
  declare line_two: string | null;
  declare line_three: string | null;
  declare city: string | null;
  declare state: string | null;
  declare postcode: string | null;
  declare delivery_instructions: string | null;
  declare contact_email: string | null;
  declare contact_phone: string | null;
  declare type: string;
  declare shipping_option: string | null;
  declare meta: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CartAddress.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    cart_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_carts', key: 'id' } },
    country_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_countries', key: 'id' } },
    title: { type: DataTypes.STRING(255), allowNull: true },
    first_name: { type: DataTypes.STRING(255), allowNull: true },
    last_name: { type: DataTypes.STRING(255), allowNull: true },
    company_name: { type: DataTypes.STRING(255), allowNull: true },
    line_one: { type: DataTypes.STRING(255), allowNull: true },
    line_two: { type: DataTypes.STRING(255), allowNull: true },
    line_three: { type: DataTypes.STRING(255), allowNull: true },
    city: { type: DataTypes.STRING(255), allowNull: true },
    state: { type: DataTypes.STRING(255), allowNull: true },
    postcode: { type: DataTypes.STRING(255), allowNull: true },
    delivery_instructions: { type: DataTypes.STRING(255), allowNull: true },
    contact_email: { type: DataTypes.STRING(255), allowNull: true },
    contact_phone: { type: DataTypes.STRING(255), allowNull: true },
    type: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'shipping' },
    shipping_option: { type: DataTypes.STRING(255), allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_cart_addresses',
    modelName: 'CartAddress',
    timestamps: true,
    underscored: false,
  }
);

export default CartAddress;