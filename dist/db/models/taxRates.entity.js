import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class TaxRate extends Model {
}
TaxRate.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tax_zone_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tax_zones', key: 'id' } },
    name: { type: DataTypes.STRING(255), allowNull: false },
    priority: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_tax_rates',
    modelName: 'TaxRate',
    timestamps: true,
    underscored: false,
});
export default TaxRate;
