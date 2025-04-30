import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICollection {
  id: number;
  collection_group_id: number;
  _lft: number;
  _rgt: number;
  parent_id: number | null;
  type: string;
  attribute_data: object;
  sort: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type CollectionCreationAttributes = Optional<ICollection, 'id'>;

export class Collection extends Model<ICollection, CollectionCreationAttributes> {
  declare id: number;
  declare collection_group_id: number;
  declare _lft: number;
  declare _rgt: number;
  declare parent_id: number | null;
  declare type: string;
  declare attribute_data: object;
  declare sort: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}

Collection.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    collection_group_id: { type:DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_collection_groups', key: 'id' } },
    _lft: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    _rgt: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    parent_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    type: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'static' },
    attribute_data: { type: DataTypes.JSON, allowNull: false },
    sort: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'custom' },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_collections',
    modelName: 'Collection',
    timestamps: true,
    paranoid: true,
    underscored: true, // Dùng _lft, _rgt
  }
);

export default Collection;