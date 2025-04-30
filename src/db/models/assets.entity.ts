import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IAsset {
  id: number;
  asset_source_id: number;
  assetable_type: string;
  assetable_id: number;
  position: number;
  data: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type AssetCreationAttributes = Optional<IAsset, 'id'>;

export class Asset extends Model<IAsset, AssetCreationAttributes> {
  declare id: number;
  declare asset_source_id: number;
  declare assetable_type: string;
  declare assetable_id: number;
  declare position: number;
  declare data: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Asset.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    asset_source_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    assetable_type: { type: DataTypes.STRING(255), allowNull: false },
    assetable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_assets',
    modelName: 'Asset',
    timestamps: true,
    underscored: false,
  }
);
export default Asset;