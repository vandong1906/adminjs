import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Channelable extends Model {
}
Channelable.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    channel_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_channels', key: 'id' } },
    channelable_type: { type: DataTypes.STRING(255), allowNull: false },
    channelable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    starts_at: { type: DataTypes.DATE, allowNull: true },
    ends_at: { type: DataTypes.DATE, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_channelables',
    modelName: 'Channelable',
    timestamps: true,
    underscored: false,
});
export default Channelable;
