import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Asset extends Model {
}
Asset.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    asset_source_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    assetable_type: { type: DataTypes.STRING(255), allowNull: false },
    assetable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_assets',
    modelName: 'Asset',
    timestamps: true,
    underscored: false,
});
export default Asset;
