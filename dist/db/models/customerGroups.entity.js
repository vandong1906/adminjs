import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CustomerCustomerGroup extends Model {
}
CustomerCustomerGroup.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    customer_group_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'lunar_customer_customer_group',
    modelName: 'CustomerCustomerGroup',
    timestamps: true,
    underscored: false,
    indexes: [
        {
            name: 'cust_cust_group_unique',
            unique: true,
            fields: ['customer_id', 'customer_group_id'],
        },
    ],
});
export default CustomerCustomerGroup;
