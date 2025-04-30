import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ITaxClass {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TaxClassCreationAttributes = Optional<ITaxClass, 'id'>;

export class TaxClass extends Model<ITaxClass, TaxClassCreationAttributes> {
  declare id: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

TaxClass.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_tax_classes',
    modelName: 'TaxClass',
    timestamps: true,
    underscored: false,
  }
);  
export default TaxClass;