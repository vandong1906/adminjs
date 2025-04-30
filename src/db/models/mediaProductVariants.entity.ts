import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IMediaProductVariant {
  id: number;
  product_variant_id: number;
  media_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type MediaProductVariantCreationAttributes = Optional<IMediaProductVariant, 'id'>;

export class MediaProductVariant extends Model<IMediaProductVariant, MediaProductVariantCreationAttributes> {
  declare id: number;
  declare product_variant_id: number;
  declare media_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

MediaProductVariant.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_variant_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_product_variants', key: 'id' } },
    media_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'media', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_media_product_variant',
    modelName: 'MediaProductVariant',
    timestamps: true,
    underscored: false,
  }
);
export default MediaProductVariant;