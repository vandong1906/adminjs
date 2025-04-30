import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IMedia {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string | null;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string | null;
  disk: string;
  conversions_disk: string | null;
  size: number;
  manipulations: object | null;
  custom_properties: object | null;
  generated_conversions: object | null;
  responsive_images: object | null;
  order_column: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export type MediaCreationAttributes = Optional<IMedia, 'id'>;

export class Media extends Model<IMedia, MediaCreationAttributes> {
  declare id: number;
  declare model_type: string;
  declare model_id: number;
  declare uuid: string | null;
  declare collection_name: string;
  declare name: string;
  declare file_name: string;
  declare mime_type: string | null;
  declare disk: string;
  declare conversions_disk: string | null;
  declare size: number;
  declare manipulations: object | null;
  declare custom_properties: object | null;
  declare generated_conversions: object | null;
  declare responsive_images: object | null;
  declare order_column: number | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Media.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    model_type: { type: DataTypes.STRING(255), allowNull: false },
    model_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    uuid: { type: DataTypes.STRING(255), allowNull: true },
    collection_name: { type: DataTypes.STRING(255), allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    file_name: { type: DataTypes.STRING(255), allowNull: false },
    mime_type: { type: DataTypes.STRING(255), allowNull: true },
    disk: { type: DataTypes.STRING(255), allowNull: false },
    conversions_disk: { type: DataTypes.STRING(255), allowNull: true },
    size: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    manipulations: { type: DataTypes.JSON, allowNull: true },
    custom_properties: { type: DataTypes.JSON, allowNull: true },
    generated_conversions: { type: DataTypes.JSON, allowNull: true },
    responsive_images: { type: DataTypes.JSON, allowNull: true },
    order_column: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'media',
    modelName: 'Media',
    timestamps: true,
    underscored: false,
  }
);
export default Media;