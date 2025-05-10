import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Discount extends Model {
}
Discount.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    handle: { type: DataTypes.STRING(255), allowNull: false },
    type: { type: DataTypes.STRING(255), allowNull: false },
    code: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    value: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    min_order_value: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    max_uses: { type: DataTypes.INTEGER, allowNull: true },
    used_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    starts_at: { type: DataTypes.DATE, allowNull: false },
    ends_at: { type: DataTypes.DATE, allowNull: true },
    priority: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    stop: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    data: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_discounts',
    modelName: 'Discount',
    timestamps: true,
    underscored: false,
});
export default Discount;
