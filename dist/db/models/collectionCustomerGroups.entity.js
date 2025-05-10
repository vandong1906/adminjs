import { DataTypes, Model } from 'sequelize';
import sequelize from '../config.js';
export class CollectionCustomerGroup extends Model {
}
CollectionCustomerGroup.init({
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    collection_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    customer_group_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    starts_at: { type: DataTypes.DATE, allowNull: true },
    ends_at: { type: DataTypes.DATE, allowNull: true },
    visible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    sequelize,
    tableName: 'lunar_collection_customer_group',
    modelName: 'CollectionCustomerGroup',
    timestamps: true,
    underscored: false,
});
export default CollectionCustomerGroup;
