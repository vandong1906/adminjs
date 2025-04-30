import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICollectionDiscount {
  id: number;
  discount_id: number;
  collection_id: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CollectionDiscountCreationAttributes = Optional<ICollectionDiscount, 'id'>;

export class CollectionDiscount extends Model<ICollectionDiscount, CollectionDiscountCreationAttributes> {
  declare id: number;
  declare discount_id: number;
  declare collection_id: number;
  declare type: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CollectionDiscount.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true},
    collection_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true},
    type: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'limitation' },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_collection_discount',
    modelName: 'CollectionDiscount',
    timestamps: true,
    underscored: false,
  }
);

export default CollectionDiscount;