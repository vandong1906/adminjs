import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IProductOption {
  id: number;
  name: object;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductOptionCreationAttributes = Optional<IProductOption, 'id'>;

export class ProductOption extends Model<IProductOption, ProductOptionCreationAttributes> {
  declare id: number;
  declare name: object;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProductOption.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.JSON, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_product_options',
    modelName: 'ProductOption',
    timestamps: true,
    underscored: false,
  }
);
export default ProductOption;