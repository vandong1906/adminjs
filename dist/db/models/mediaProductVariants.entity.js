import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class MediaProductVariant extends Model {
}
MediaProductVariant.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    product_variant_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_product_variants', key: 'id' } },
    media_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'media', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_media_product_variant',
    modelName: 'MediaProductVariant',
    timestamps: true,
    underscored: false,
});
export default MediaProductVariant;
