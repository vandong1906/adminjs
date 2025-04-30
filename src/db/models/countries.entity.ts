import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config.js';

interface ICountry {
  id: number;
  name: string;
  iso3: string;
  iso2: string | null;
  phonecode: string;
  capital: string | null;
  currency: string;
  native: string | null;
  emoji: string;
  emoji_u: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CountryCreationAttributes = Optional<ICountry, 'id'>;

export class Country extends Model<ICountry, CountryCreationAttributes> {
  declare id: number;
  declare name: string;
  declare iso3: string;
  declare iso2: string | null;
  declare phonecode: string;
  declare capital: string | null;
  declare currency: string;
  declare native: string | null;
  declare emoji: string;
  declare emoji_u: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Country.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    iso3: { type: DataTypes.STRING(255), allowNull: false },
    iso2: { type: DataTypes.STRING(255), allowNull: true },
    phonecode: { type: DataTypes.STRING(255), allowNull: false },
    capital: { type: DataTypes.STRING(255), allowNull: true },
    currency: { type: DataTypes.STRING(255), allowNull: false },
    native: { type: DataTypes.STRING(255), allowNull: true },
    emoji: { type: DataTypes.STRING(255), allowNull: false },
    emoji_u: { type: DataTypes.STRING(255), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'lunar_countries',
    modelName: 'Country',
    timestamps: true,
    underscored: false,
  }
);

export default Country;