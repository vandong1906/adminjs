import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IAttributeGroup {
  id: number;
  attributable_type: string;
  name: object;
  handle: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AttributeGroupCreationAttributes = Optional<IAttributeGroup, 'id'>;

export class AttributeGroup extends Model<IAttributeGroup, AttributeGroupCreationAttributes> {
  declare id: number;
  declare attributable_type: string;
  declare name: object;
  declare handle: string;
  declare position: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

AttributeGroup.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    attributable_type: { type: DataTypes.STRING(255), allowNull: false },
    name: { type: DataTypes.JSON, allowNull: false },
    handle: { type: DataTypes.STRING(255), allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_attribute_groups',
    modelName: 'AttributeGroup',
    timestamps: true,
    underscored: false,
  }
);

export default AttributeGroup;