import { DataTypes, Model, Optional } from 'sequelize'

import sequelize from '../config.js'

interface ICategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryCreationAttributes = Optional<ICategory, 'id'>

export class Category extends Model<ICategory, CategoryCreationAttributes> {
  declare id: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Category.init(
  {
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
  },
  {
    sequelize,
    tableName: 'categories',
    modelName: 'category',
  }
)

export default Category