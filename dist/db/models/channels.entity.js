import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Channel extends Model {
}
Channel.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    handle: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'lunar_channels',
    modelName: 'Channel',
    timestamps: true,
    paranoid: true,
    underscored: false,
});
export default Channel;
