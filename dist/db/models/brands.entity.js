import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Brand extends Model {
}
Brand.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    attribute_data: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_brands',
    modelName: 'Brand',
    timestamps: true,
    underscored: false,
});
export default Brand;
