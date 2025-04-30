import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ITaxZoneCustomerGroup {
  id: number;
  tax_zone_id: number;
  customer_group_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TaxZoneCustomerGroupCreationAttributes = Optional<ITaxZoneCustomerGroup, 'id'>;

export class TaxZoneCustomerGroup extends Model<ITaxZoneCustomerGroup, TaxZoneCustomerGroupCreationAttributes> {
  declare id: number;
  declare tax_zone_id: number;
  declare customer_group_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

TaxZoneCustomerGroup.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tax_zone_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false},
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_tax_zone_customer_groups',
    modelName: 'TaxZoneCustomerGroup',
    timestamps: true,
    underscored: false,
  }
);
export default TaxZoneCustomerGroup;