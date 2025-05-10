import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Media extends Model {
}
Media.init({
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
}, {
    sequelize,
    tableName: 'media',
    modelName: 'Media',
    timestamps: true,
    underscored: false,
});
export default Media;
