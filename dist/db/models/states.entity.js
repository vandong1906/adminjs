import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class State extends Model {
}
State.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    country_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_countries', key: 'id' } },
    name: { type: DataTypes.STRING(255), allowNull: false },
    code: { type: DataTypes.STRING(255), allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_states',
    modelName: 'State',
    timestamps: true,
    underscored: false,
});
export default State;
