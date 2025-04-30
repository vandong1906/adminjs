import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ILanguage {
  id: number;
  code: string;
  name: string;
  default: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type LanguageCreationAttributes = Optional<ILanguage, 'id'>;

export class Language extends Model<ILanguage, LanguageCreationAttributes> {
  declare id: number;
  declare code: string;
  declare name: string;
  declare default: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Language.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING(255), allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    default: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_languages',
    modelName: 'Language',
    timestamps: true,
    underscored: false,
  }
);

export default Language;