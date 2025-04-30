import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface IChannelable {
  id: number;
  channel_id: number;
  channelable_type: string;
  channelable_id: number;
  enabled: boolean;
  starts_at: Date | null;
  ends_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ChannelableCreationAttributes = Optional<IChannelable, 'id'>;

export class Channelable extends Model<IChannelable, ChannelableCreationAttributes> {
  declare id: number;
  declare channel_id: number;
  declare channelable_type: string;
  declare channelable_id: number;
  declare enabled: boolean;
  declare starts_at: Date | null;
  declare ends_at: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Channelable.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    channel_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: 'lunar_channels', key: 'id' } },
    channelable_type: { type: DataTypes.STRING(255), allowNull: false },
    channelable_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    starts_at: { type: DataTypes.DATE, allowNull: true },
    ends_at: { type: DataTypes.DATE, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_channelables',
    modelName: 'Channelable',
    timestamps: true,
    underscored: false,
  }
);

export default Channelable;