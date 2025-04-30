import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IProductAssociation {
  id: number;
  product_parent_id: number;
  product_target_id: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductAssociationCreationAttributes = Optional<IProductAssociation, 'id'>;

export class ProductAssociation extends Model<IProductAssociation, ProductAssociationCreationAttributes> {
  declare id: number;
  declare product_parent_id: number;
  declare product_target_id: number;
  declare type: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProductAssociation.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_parent_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    product_target_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    type: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_product_associations',
    modelName: 'ProductAssociation',
    timestamps: true,
    underscored: false,
  }
);
export default ProductAssociation;