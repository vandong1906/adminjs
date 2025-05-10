import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class TaxRateAmount extends Model {
}
TaxRateAmount.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tax_class_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tax_classes', key: 'id' } },
    tax_rate_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tax_rates', key: 'id' } },
    percentage: { type: DataTypes.FLOAT, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_tax_rate_amounts',
    modelName: 'TaxRateAmount',
    timestamps: true,
    underscored: false,
});
export default TaxRateAmount;
