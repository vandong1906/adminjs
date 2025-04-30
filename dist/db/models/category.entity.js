import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Category extends Model {
}
Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    tableName: 'categories',
    modelName: 'category',
});
