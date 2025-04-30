    // filepath: src/db/models/users.entity.ts
    import { DataTypes, Model, Optional } from 'sequelize';
    import sequelize from '../config.js';

    interface IUser {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    }

    export type UserCreationAttributes = Optional<IUser, 'id'>;

    export class User extends Model<IUser, UserCreationAttributes> {
    declare id: number;
    declare email: string;
    declare password: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    }

    User.init(
    {
        id: { type:  DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
        email: { type: DataTypes.STRING(255), allowNull: false },
        password: { type: DataTypes.STRING(255), allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: true },
        updatedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        timestamps: true,
    }
    );

    export default User; 