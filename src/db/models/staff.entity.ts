import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IStaff {
  id: number;
  admin: boolean;
  user_id: number;
  firstname: string | null;
  lastname: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type StaffCreationAttributes = Optional<IStaff, 'id'>;

export class Staff extends Model<IStaff, StaffCreationAttributes> {
  declare id: number;
  declare admin: boolean;
  declare user_id: number;
  declare firstname: string | null;
  declare lastname: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}

Staff.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' } },
    firstname: { type: DataTypes.STRING(255), allowNull: true },
    lastname: { type: DataTypes.STRING(255), allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_staff',
    modelName: 'Staff',
    timestamps: true,
    paranoid: true,
    underscored: false,
  }
);
export default Staff;