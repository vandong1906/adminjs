import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICollectionGroup {
  id: number;
  name: string;
  handle: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CollectionGroupCreationAttributes = Optional<ICollectionGroup, 'id'>;

export class CollectionGroup extends Model<ICollectionGroup, CollectionGroupCreationAttributes> {
  declare id: number;
  declare name: string;
  declare handle: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CollectionGroup.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    handle: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_collection_groups',
    modelName: 'CollectionGroup',
    timestamps: true,
    underscored: false,
  }
);

export default CollectionGroup;