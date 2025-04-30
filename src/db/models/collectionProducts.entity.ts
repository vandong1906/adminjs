import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICollectionProduct {
  id: number;
  collection_id: number;
  product_id: number;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CollectionProductCreationAttributes = Optional<ICollectionProduct, 'id'>;

export class CollectionProduct extends Model<ICollectionProduct, CollectionProductCreationAttributes> {
  declare id: number;
  declare collection_id: number;
  declare product_id: number;
  declare position: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CollectionProduct.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    collection_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_collections', key: 'id' } },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_products', key: 'id' } },
    position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_collection_product',
    modelName: 'CollectionProduct',
    timestamps: true,
    underscored: false,
  }
);

export default CollectionProduct;