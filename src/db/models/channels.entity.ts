import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IChannel {
  id: number;
  name: string;
  handle: string;
  default: boolean;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type ChannelCreationAttributes = Optional<IChannel, 'id'>;

export class Channel extends Model<IChannel, ChannelCreationAttributes> {
  declare id: number;
  declare name: string;
  declare handle: string;
  declare default: boolean;
  declare url: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;
}

Channel.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    handle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'lunar_channels',
    modelName: 'Channel',
    timestamps: true,
    paranoid: true,
    underscored: false,
  }
);

export default Channel;