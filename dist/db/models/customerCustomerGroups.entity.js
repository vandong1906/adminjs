import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CustomerCustomerGroup extends Model {
}
CustomerCustomerGroup.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_customers', key: 'id' } },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: 'lunar_customer_groups', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_customer_customer_group',
    modelName: 'CustomerCustomerGroup',
    timestamps: true,
    underscored: false,
});
export default CustomerCustomerGroup;
