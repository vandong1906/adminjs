import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class Attribute extends Model {
}
Attribute.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    attribute_type: { type: DataTypes.STRING(255), allowNull: false },
    attribute_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_attribute_groups', key: 'id' } },
    position: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.JSON, allowNull: false },
    description: { type: DataTypes.JSON, allowNull: true },
    handle: { type: DataTypes.STRING(255), allowNull: false },
    section: { type: DataTypes.STRING(255), allowNull: true },
    type: { type: DataTypes.STRING(255), allowNull: false },
    required: { type: DataTypes.BOOLEAN, allowNull: false },
    default_value: { type: DataTypes.STRING(255), allowNull: true },
    configuration: { type: DataTypes.JSON, allowNull: false },
    system: { type: DataTypes.BOOLEAN, allowNull: false },
    validation_rules: { type: DataTypes.STRING(255), allowNull: true },
    filterable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    searchable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_attributes',
    modelName: 'Attribute',
    timestamps: true,
    underscored: false,
});
export default Attribute;
