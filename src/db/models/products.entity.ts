import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IProduct {
  id: number;
  product_type_id: number;
  status: string;
  brand_id: number | null;
  attribute_data: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCreationAttributes = Optional<IProduct, 'id'>;

export class Product extends Model<IProduct, ProductCreationAttributes> {
  declare id: number;
  declare product_type_id: number;
  declare status: string;
  declare brand_id: number | null;
  declare attribute_data: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Product.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_type_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true},
    status: { type: DataTypes.STRING(255), allowNull: false },
    brand_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true,},
    attribute_data: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_products',
    modelName: 'Product',
    timestamps: true,
    underscored: false,
  }
);
export default Product;