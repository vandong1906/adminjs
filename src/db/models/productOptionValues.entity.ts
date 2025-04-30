import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IProductOptionValue {
  id: number;
  product_option_id: number;
  name: object;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductOptionValueCreationAttributes = Optional<IProductOptionValue, 'id'>;

export class ProductOptionValue extends Model<IProductOptionValue, ProductOptionValueCreationAttributes> {
  declare id: number;
  declare product_option_id: number;
  declare name: object;
  declare position: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProductOptionValue.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_option_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_product_options', key: 'id' } },
    name: { type: DataTypes.JSON, allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_product_option_values',
    modelName: 'ProductOptionValue',
    timestamps: true,
    underscored: false,
  }
);
export default ProductOptionValue;