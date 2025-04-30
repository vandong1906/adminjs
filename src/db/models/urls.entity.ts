import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IUrl {
  id: number;
  element_type: string;
  element_id: number;
  language_id: number;
  default: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UrlCreationAttributes = Optional<IUrl, 'id'>;

 class Url extends Model<IUrl, UrlCreationAttributes> {
  declare id: number;
  declare element_type: string;
  declare element_id: number;
  declare language_id: number;
  declare default: boolean;
  declare slug: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Url.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    element_type: { type: DataTypes.STRING(255), allowNull: false },
    element_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    language_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_languages', key: 'id' } },
    default: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    slug: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_urls',
    modelName: 'Url',
    timestamps: true,
    underscored: false,
  }
);
export default Url;