import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ITag {
  id: number;
  type: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TagCreationAttributes = Optional<ITag, 'id'>;

export class Tag extends Model<ITag, TagCreationAttributes> {
  declare id: number;
  declare type: string;
  declare value: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Tag.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING(255), allowNull: false },
    value: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_tags',
    modelName: 'Tag',
    timestamps: true,
    underscored: false,
  }
);
export default Tag;