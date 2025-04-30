import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IState {
  id: number;
  country_id: number;
  name: string;
  code: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type StateCreationAttributes = Optional<IState, 'id'>;

export class State extends Model<IState, StateCreationAttributes> {
  declare id: number;
  declare country_id: number;
  declare name: string;
  declare code: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

State.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    country_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_countries', key: 'id' } },
    name: { type: DataTypes.STRING(255), allowNull: false },
    code: { type: DataTypes.STRING(255), allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_states',
    modelName: 'State',
    timestamps: true,
    underscored: false,
  }
);
export default State;