import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ITransaction {
  id: number;
  order_id: number;
  driver: string;
  amount: number;
  reference: string | null;
  status: string | null;
  notes: string | null;
  card_type: string | null;
  last_four: string | null;
  meta: object | null;
  success: boolean;
  refund: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TransactionCreationAttributes = Optional<ITransaction, 'id'>;

export class Transaction extends Model<ITransaction, TransactionCreationAttributes> {
  declare id: number;
  declare order_id: number;
  declare driver: string;
  declare amount: number;
  declare reference: string | null;
  declare status: string | null;
  declare notes: string | null;
  declare card_type: string | null;
  declare last_four: string | null;
  declare meta: object | null;
  declare success: boolean;
  declare refund: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Transaction.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_orders', key: 'id' } },
    driver: { type: DataTypes.STRING(255), allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    reference: { type: DataTypes.STRING(255), allowNull: true },
    status: { type: DataTypes.STRING(255), allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    card_type: { type: DataTypes.STRING(255), allowNull: true },
    last_four: { type: DataTypes.STRING(255), allowNull: true },
    meta: { type: DataTypes.JSON, allowNull: true },
    success: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    refund: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_transactions',
    modelName: 'Transaction',
    timestamps: true,
    underscored: false,
  }
);
export default Transaction;