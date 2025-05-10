import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CustomerUser extends Model {
}
CustomerUser.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_customers', key: 'id' } },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_customer_user',
    modelName: 'CustomerUser',
    timestamps: true,
    underscored: false,
});
export default CustomerUser;
