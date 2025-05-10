import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Currency extends Model {
}
Currency.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING(255), allowNull: false },
    name: { type: DataTypes.STRING(255), allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    exchange_rate: { type: DataTypes.FLOAT, allowNull: false },
    format: { type: DataTypes.STRING(255), allowNull: false },
    decimal_point: { type: DataTypes.STRING(255), allowNull: false },
    thousand_point: { type: DataTypes.STRING(255), allowNull: false },
    decimal_places: { type: DataTypes.INTEGER, allowNull: false },
    default: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_currencies',
    modelName: 'Currency',
    timestamps: true,
    underscored: false,
});
export default Currency;
