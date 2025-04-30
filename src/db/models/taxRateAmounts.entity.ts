import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ITaxRateAmount {
  id: number;
  tax_class_id: number;
  tax_rate_id: number;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TaxRateAmountCreationAttributes = Optional<ITaxRateAmount, 'id'>;

export class TaxRateAmount extends Model<ITaxRateAmount, TaxRateAmountCreationAttributes> {
  declare id: number;
  declare tax_class_id: number;
  declare tax_rate_id: number;
  declare percentage: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

TaxRateAmount.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    tax_class_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tax_classes', key: 'id' } },
    tax_rate_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_tax_rates', key: 'id' } },
    percentage: { type: DataTypes.FLOAT, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_tax_rate_amounts',
    modelName: 'TaxRateAmount',
    timestamps: true,
    underscored: false,
  }
);
export default TaxRateAmount;