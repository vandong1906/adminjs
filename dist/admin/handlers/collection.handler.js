import { models } from '../../db/models/association.js';
import { AttributeDataCast } from '../field-types/attribute-data.cast.js';
import { Op } from 'sequelize';
export class CollectionHandler {
    static async getCollection(id) {
        try {
            const collection = await models.Collection.findByPk(id, {
                include: [
                    { model: models.CollectionGroup, as: 'collectionGroup' },
                    { model: models.Collection, as: 'parent' },
                    { model: models.Collection, as: 'children' },
                    { model: models.Product, as: 'products' },
                    { model: models.Customer, as: 'customers' },
                    { model: models.CustomerGroup, as: 'customerGroups' },
                ],
            });
            if (!collection) {
                return { success: false, error: 'Collection not found' };
            }
            const attributeData = collection.attribute_data
                ? AttributeDataCast.cast(collection.attribute_data)
                : {};
            return {
                success: true,
                collection: {
                    ...collection.toJSON(),
                    parsedAttributes: attributeData,
                },
            };
        }
        catch (error) {
            console.error('Error getting collection:', error);
            return { success: false, error: error.message };
        }
    }
    static async getCollectionAttributes() {
        try {
            const attributes = await models.Attribute.findAll({
                where: {
                    attribute_type: 'collection',
                },
                order: [['position', 'ASC']],
            });
            return {
                success: true,
                attributes,
            };
        }
        catch (error) {
            console.error('Error getting collection attributes:', error);
            return { success: false, error: error.message };
        }
    }
    static async getCollectionGroups() {
        try {
            const groups = await models.CollectionGroup.findAll({
                order: [['name', 'ASC']],
            });
            return {
                success: true,
                groups,
            };
        }
        catch (error) {
            console.error('Error getting collection groups:', error);
            return { success: false, error: error.message };
        }
    }
    static async createCollection(data) {
        try {
            const attributeData = data.attribute_data
                ? data.attribute_data
                : {};
            const collection = await models.Collection.create({
                collection_group_id: data.collection_group_id,
                parent_id: data.parent_id || null,
                type: data.type || 'static',
                attribute_data: attributeData,
                sort: data.sort || 'custom',
                _lft: 0,
                _rgt: 0,
            });
            if (data.parent_id) {
                await this.updateNestedSetValues(collection.id, data.parent_id);
            }
            else {
                await collection.update({
                    _lft: 1,
                    _rgt: 2,
                });
            }
            if (data.product_ids && Array.isArray(data.product_ids) && data.product_ids.length > 0) {
                await Promise.all(data.product_ids.map(async (productId) => {
                    return models.CollectionProduct.create({
                        collection_id: collection.id,
                        product_id: productId,
                    });
                }));
            }
            return {
                success: true,
                collection,
            };
        }
        catch (error) {
            console.error('Error creating collection:', error);
            return { success: false, error: error.message };
        }
    }
    static async updateCollection(id, data) {
        try {
            const collection = await models.Collection.findByPk(id);
            if (!collection) {
                return { success: false, error: 'Collection not found' };
            }
            let attributeData = {};
            if (typeof data.attribute_data === 'string') {
                attributeData = JSON.parse(data.attribute_data);
            }
            else if (data.attribute_data) {
                attributeData = data.attribute_data;
            }
            const parentChanging = data.parent_id !== undefined
                && data.parent_id !== collection.parent_id;
            await collection.update({
                collection_group_id: data.collection_group_id,
                parent_id: data.parent_id,
                type: data.type,
                attribute_data: attributeData,
                sort: data.sort,
            });
            if (parentChanging) {
                await this.updateNestedSetValues(id, data.parent_id);
            }
            if (data.product_ids && Array.isArray(data.product_ids)) {
                await models.CollectionProduct.destroy({
                    where: { collection_id: id },
                });
                if (data.product_ids.length > 0) {
                    await Promise.all(data.product_ids.map(async (productId) => {
                        return models.CollectionProduct.create({
                            collection_id: id,
                            product_id: productId,
                        });
                    }));
                }
            }
            return {
                success: true,
                collection,
            };
        }
        catch (error) {
            console.error('Error updating collection:', error);
            return { success: false, error: error.message };
        }
    }
    static async deleteCollection(id) {
        try {
            const collection = await models.Collection.findByPk(id, {
                include: [{ model: models.Collection, as: 'children' }],
            });
            if (!collection) {
                return { success: false, error: 'Collection not found' };
            }
            const childrenCollections = await models.Collection.findAll({
                where: { parent_id: id }
            });
            if (childrenCollections.length > 0) {
                return {
                    success: false,
                    error: 'Cannot delete collection with child collections. Please delete or reassign children first.'
                };
            }
            await models.CollectionProduct.destroy({ where: { collection_id: id } });
            await models.CollectionCustomerGroup.destroy({ where: { collection_id: id } });
            await collection.destroy();
            await this.reorderNestedSetAfterDelete(collection.parent_id);
            return {
                success: true,
            };
        }
        catch (error) {
            console.error('Error deleting collection:', error);
            return { success: false, error: error.message };
        }
    }
    static async updateNestedSetValues(collectionId, parentId) {
        try {
            if (!parentId) {
                const collection = await models.Collection.findByPk(collectionId);
                if (collection) {
                    const maxRgtValue = await models.Collection.max('_rgt', {
                        where: { parent_id: null }
                    });
                    const maxRgt = maxRgtValue ? Number(maxRgtValue) : 0;
                    await collection.update({
                        _lft: maxRgt + 1,
                        _rgt: maxRgt + 2,
                    });
                }
                return;
            }
            const parent = await models.Collection.findByPk(parentId);
            if (!parent)
                return;
            const maxChildRgtValue = await models.Collection.max('_rgt', {
                where: { parent_id: parentId }
            });
            const parentLft = parent._lft ? Number(parent._lft) : 0;
            const maxChildRgt = maxChildRgtValue ? Number(maxChildRgtValue) : parentLft;
            const newLeft = maxChildRgt + 1;
            const newRight = maxChildRgt + 2;
            await models.Collection.increment('_rgt', {
                by: 2,
                where: { _rgt: { [Op.gte]: newLeft } }
            });
            await models.Collection.increment('_lft', {
                by: 2,
                where: { _lft: { [Op.gt]: newLeft } }
            });
            const collection = await models.Collection.findByPk(collectionId);
            if (collection) {
                await collection.update({
                    _lft: newLeft,
                    _rgt: newRight,
                });
            }
        }
        catch (error) {
            console.error('Error updating nested set values:', error);
            throw error;
        }
    }
    static async reorderNestedSetAfterDelete(parentId) {
        try {
            const siblings = await models.Collection.findAll({
                where: { parent_id: parentId },
                order: [['_lft', 'ASC']]
            });
            let currentLeft = 1;
            if (parentId) {
                const parent = await models.Collection.findByPk(parentId);
                if (parent && parent._lft) {
                    currentLeft = Number(parent._lft) + 1;
                }
            }
            for (const sibling of siblings) {
                await sibling.update({
                    _lft: currentLeft,
                    _rgt: currentLeft + 1
                });
                currentLeft += 2;
            }
            if (parentId) {
                const parent = await models.Collection.findByPk(parentId);
                if (parent) {
                    await parent.update({
                        _rgt: currentLeft
                    });
                }
            }
        }
        catch (error) {
            console.error('Error reordering nested set after delete:', error);
            throw error;
        }
    }
}
