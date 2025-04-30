import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICollectionCustomerGroup {
  id: number;
  collection_id: number;
  customer_group_id: number;
  enabled: boolean;
  starts_at: Date | null;
  ends_at: Date | null;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CollectionCustomerGroupCreationAttributes = Optional<ICollectionCustomerGroup, 'id'>;

export class CollectionCustomerGroup extends Model<ICollectionCustomerGroup, CollectionCustomerGroupCreationAttributes> {
  declare id: number;
  declare collection_id: number;
  declare customer_group_id: number;
  declare enabled: boolean;
  declare starts_at: Date | null;
  declare ends_at: Date | null;
  declare visible: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

CollectionCustomerGroup.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    collection_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true},
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true},
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    starts_at: { type: DataTypes.DATE, allowNull: true },
    ends_at: { type: DataTypes.DATE, allowNull: true },
    visible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_collection_customer_group',
    modelName: 'CollectionCustomerGroup',
    timestamps: true,
    underscored: false,
  }
);

export default CollectionCustomerGroup;