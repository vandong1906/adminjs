import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IProductType {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductTypeCreationAttributes = Optional<IProductType, 'id'>;

export class ProductType extends Model<IProductType, ProductTypeCreationAttributes> {
  declare id: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProductType.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_product_types',
    modelName: 'ProductType',
    timestamps: true,
    underscored: false,
  }
);
export default ProductType;