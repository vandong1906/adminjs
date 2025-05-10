import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Customer extends Model {
}
Customer.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: true },
    first_name: { type: DataTypes.STRING(255), allowNull: false },
    last_name: { type: DataTypes.STRING(255), allowNull: false },
    company_name: { type: DataTypes.STRING(255), allowNull: true },
    vat_no: { type: DataTypes.STRING(255), allowNull: true },
    attribute_data: { type: DataTypes.JSON, allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_customers',
    modelName: 'Customer',
    timestamps: true,
    underscored: false,
});
export default Customer;
