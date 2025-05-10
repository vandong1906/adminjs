import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class TaxZone extends Model {
}
TaxZone.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    zone_type: { type: DataTypes.STRING(255), allowNull: false },
    price_display: { type: DataTypes.STRING(255), allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false },
    default: { type: DataTypes.BOOLEAN, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_tax_zones',
    modelName: 'TaxZone',
    timestamps: true,
    underscored: false,
});
export default TaxZone;
