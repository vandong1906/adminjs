import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ITaggable {
  id: number;
  tag_id: number;
  taggable_type: string;
  taggable_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TaggableCreationAttributes = Optional<ITaggable, 'id'>;

export class Taggable extends Model<ITaggable, TaggableCreationAttributes> {
  declare id: number;
  declare tag_id: number;
  declare taggable_type: string;
  declare taggable_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Taggable.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tag_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tags', key: 'id' } },
    taggable_type: { type: DataTypes.STRING(255), allowNull: false },
    taggable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_taggables',
    modelName: 'Taggable',
    timestamps: true,
    underscored: false,
  }
);
export default Taggable;