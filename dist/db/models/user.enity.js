import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class User extends Model {
}
User.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(255), allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
});
export default User;
