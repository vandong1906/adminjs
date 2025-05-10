import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class AttributeGroup extends Model {
}
AttributeGroup.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    attributable_type: { type: DataTypes.STRING(255), allowNull: false },
    name: { type: DataTypes.JSON, allowNull: false },
    handle: { type: DataTypes.STRING(255), allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_attribute_groups',
    modelName: 'AttributeGroup',
    timestamps: true,
    underscored: false,
});
export default AttributeGroup;
