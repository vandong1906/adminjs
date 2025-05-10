import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CustomerDiscount extends Model {
}
CustomerDiscount.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_customers', key: 'id' } },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_discounts', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_customer_discount',
    modelName: 'CustomerDiscount',
    timestamps: true,
    underscored: false,
});
export default CustomerDiscount;
