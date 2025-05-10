import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CustomerGroupDiscount extends Model {
}
CustomerGroupDiscount.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    type: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'limitation' },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_customer_group_discount',
    modelName: 'CustomerGroupDiscount',
    timestamps: true,
    underscored: false,
});
export default CustomerGroupDiscount;
