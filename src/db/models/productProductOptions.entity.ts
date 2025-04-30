import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IProductProductOption {
  id: number;
  product_id: number;
  product_option_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductProductOptionCreationAttributes = Optional<IProductProductOption, 'id'>;

export class ProductProductOption extends Model<IProductProductOption, ProductProductOptionCreationAttributes> {
  declare id: number;
  declare product_id: number;
  declare product_option_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProductProductOption.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    product_option_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_product_options', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_product_product_option',
    modelName: 'ProductProductOption',
    timestamps: true,
    underscored: false,
  }
);
export default ProductProductOption;