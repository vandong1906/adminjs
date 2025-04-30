import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';
import e from 'express';

interface IAttribute {
  id: number;
  attribute_type: string;
  attribute_group_id: number;
  position: number;
  name: object;
  description: object | null;
  handle: string;
  section: string | null;
  type: string;
  required: boolean;
  default_value: string | null;
  configuration: object;
  system: boolean;
  validation_rules: string | null;
  filterable: boolean;
  searchable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AttributeCreationAttributes = Optional<IAttribute, 'id'>;

export class Attribute extends Model<IAttribute, AttributeCreationAttributes> {
  declare id: number;
  declare attribute_type: string;
  declare attribute_group_id: number;
  declare position: number;
  declare name: object;
  declare description: object | null;
  declare handle: string;
  declare section: string | null;
  declare type: string;
  declare required: boolean;
  declare default: boolean;
  declare default_value: string | null;
  declare configuration: object;
  declare system: boolean;
  declare validation_rules: string | null;
  declare filterable: boolean;
  declare searchable: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Attribute.init(
  {
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
  },
  {
    sequelize,
    tableName: 'lunar_attributes',
    modelName: 'Attribute',
    timestamps: true,
    underscored: false,
  }
);

export default Attribute;