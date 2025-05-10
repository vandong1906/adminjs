import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Price extends Model {
}
Price.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    currency_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    priceable_type: { type: DataTypes.STRING(255), allowNull: false },
    priceable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    compare_price: { type: DataTypes.INTEGER, allowNull: true },
    tier: { type: DataTypes.INTEGER, allowNull: false },
    meta: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_prices',
    modelName: 'Price',
    timestamps: true,
    underscored: false,
});
export default Price;
