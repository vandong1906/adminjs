import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CustomerGroupProduct extends Model {
}
CustomerGroupProduct.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    starts_at: { type: DataTypes.DATE, allowNull: true },
    ends_at: { type: DataTypes.DATE, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_customer_group_product',
    modelName: 'CustomerGroupProduct',
    timestamps: true,
    underscored: false,
});
export default CustomerGroupProduct;
