import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IBrand {
  id: number;
  name: string;
  attribute_data: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type BrandCreationAttributes = Optional<IBrand, 'id'>;

export class Brand extends Model<IBrand, BrandCreationAttributes> {
  declare id: number;
  declare name: string;
  declare attribute_data: object | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Brand.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    attribute_data: { type: DataTypes.JSON, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_brands',
    modelName: 'Brand',
    timestamps: true,
    underscored: false,
  }
);

export default Brand;