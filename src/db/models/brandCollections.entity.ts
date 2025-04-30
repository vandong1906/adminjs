import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IBrandCollection {
  id: number;
  brand_id: number;
  collection_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type BrandCollectionCreationAttributes = Optional<IBrandCollection, 'id'>;

export class BrandCollection extends Model<IBrandCollection, BrandCollectionCreationAttributes> {
  declare id: number;
  declare brand_id: number;
  declare collection_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

BrandCollection.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    brand_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_brands', key: 'id' } },
    collection_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_collections', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_brand_collection',
    modelName: 'BrandCollection',
    timestamps: true,
    underscored: false,
  }
);

export default BrandCollection;