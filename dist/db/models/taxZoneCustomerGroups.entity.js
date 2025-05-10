import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class TaxZoneCustomerGroup extends Model {
}
TaxZoneCustomerGroup.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tax_zone_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_tax_zone_customer_groups',
    modelName: 'TaxZoneCustomerGroup',
    timestamps: true,
    underscored: false,
});
export default TaxZoneCustomerGroup;
