import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Staff extends Model {
}
Staff.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
    firstname: { type: DataTypes.STRING(255), allowNull: true },
    lastname: { type: DataTypes.STRING(255), allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_staff',
    modelName: 'Staff',
    timestamps: true,
    paranoid: true,
    underscored: false,
});
export default Staff;
