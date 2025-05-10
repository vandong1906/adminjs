import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class TaxZoneState extends Model {
}
TaxZoneState.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tax_zone_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tax_zones', key: 'id' } },
    state_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_states', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_tax_zone_states',
    modelName: 'TaxZoneState',
    timestamps: true,
    underscored: false,
});
export default TaxZoneState;
