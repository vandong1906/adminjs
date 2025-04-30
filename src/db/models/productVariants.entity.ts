import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IProductVariant {
  id: number;
  product_id: number;
  tax_class_id: number;
  sku: string;
  stock: number;
  unit_quantity: number;
  backorder: number | null;
  purchasable: string;
  attribute_data: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductVariantCreationAttributes = Optional<IProductVariant, 'id'>;

export class ProductVariant extends Model<IProductVariant, ProductVariantCreationAttributes> {
  declare id: number;
  declare product_id: number;
  declare tax_class_id: number;
  declare sku: string;
  declare stock: number;
  declare unit_quantity: number;
  declare backorder: number | null;
  declare purchasable: string;
  declare attribute_data: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProductVariant.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    tax_class_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_tax_classes', key: 'id' } },
    sku: { type: DataTypes.STRING(255), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    unit_quantity: { type: DataTypes.INTEGER, allowNull: false },
    backorder: { type: DataTypes.INTEGER, allowNull: true },
    purchasable: { type: DataTypes.STRING(255), allowNull: false },
    attribute_data: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_product_variants',
    modelName: 'ProductVariant',
    timestamps: true,
    underscored: false,
  }
);
export default ProductVariant;