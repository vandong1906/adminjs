import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class DiscountUser extends Model {
}
DiscountUser.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    discount_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_discounts', key: 'id' } },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_discount_user',
    modelName: 'DiscountUser',
    timestamps: true,
    underscored: false,
});
export default DiscountUser;
