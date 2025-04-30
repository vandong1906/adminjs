import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IAttributable {
  id: number;
  attributable_type: string;
  attributable_id: number;
  attribute_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AttributableCreationAttributes = Optional<IAttributable, 'id'>;

export class Attributable extends Model<IAttributable, AttributableCreationAttributes> {
  declare id: number;
  declare attributable_type: string;
  declare attributable_id: number;
  declare attribute_id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Attributable.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    attributable_type: { type: DataTypes.STRING(255), allowNull: false },
    attributable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    attribute_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_attributes', key: 'id' } },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_attributables',
    modelName: 'Attributable',
    timestamps: true,
    underscored: false,
  }
);

export default Attributable;