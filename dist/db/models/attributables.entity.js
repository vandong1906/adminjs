import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Attributable extends Model {
}
Attributable.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    attributable_type: { type: DataTypes.STRING(255), allowNull: false },
    attributable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    attribute_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_attributes', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_attributables',
    modelName: 'Attributable',
    timestamps: true,
    underscored: false,
});
export default Attributable;
