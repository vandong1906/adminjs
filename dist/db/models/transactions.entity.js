import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Transaction extends Model {
}
Transaction.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_orders', key: 'id' } },
    driver: { type: DataTypes.STRING(255), allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    reference: { type: DataTypes.STRING(255), allowNull: true },
    status: { type: DataTypes.STRING(255), allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    card_type: { type: DataTypes.STRING(255), allowNull: true },
    last_four: { type: DataTypes.STRING(255), allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    success: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    refund: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_transactions',
    modelName: 'Transaction',
    timestamps: true,
    underscored: false,
});
export default Transaction;
