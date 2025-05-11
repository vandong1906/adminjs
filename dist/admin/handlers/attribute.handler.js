import { models as Models } from '../../db/models/association.js';
export class AttributeHandler {
    static async getAttributes(query = {}) {
        try {
            const attributes = await Models.Attribute.findAll({
                where: query,
                include: [{
                        model: Models.AttributeGroup,
                        as: 'group'
                    }],
                order: [
                    ['position', 'ASC'],
                    ['id', 'ASC']
                ]
            });
            return { success: true, data: attributes };
        }
        catch (error) {
            console.error('Error fetching attributes:', error);
            return { success: false, error: error.message };
        }
    }
    static async getAttribute(id) {
        try {
            const attribute = await Models.Attribute.findByPk(id, {
                include: ['group']
            });
            if (!attribute) {
                return { success: false, error: 'Attribute not found' };
            }
            return { success: true, data: attribute };
        }
        catch (error) {
            console.error('Error fetching attribute:', error);
            return { success: false, error: error.message };
        }
    }
    static async createAttribute(data) {
        try {
            const parsedData = this.parseJsonFields(data);
            this.validateRequiredFields(parsedData);
            const attribute = await Models.Attribute.create(parsedData);
            return { success: true, data: attribute };
        }
        catch (error) {
            console.error('Error creating attribute:', error);
            return { success: false, error: error.message };
        }
    }
    static async updateAttribute(id, data) {
        try {
            const attribute = await Models.Attribute.findByPk(id);
            if (!attribute) {
                return { success: false, error: 'Attribute not found' };
            }
            const parsedData = this.parseJsonFields(data);
            this.validateRequiredFields(parsedData);
            await attribute.update(parsedData);
            return { success: true, data: attribute };
        }
        catch (error) {
            console.error('Error updating attribute:', error);
            return { success: false, error: error.message };
        }
    }
    static async deleteAttribute(id) {
        try {
            const attribute = await Models.Attribute.findByPk(id);
            if (!attribute) {
                return { success: false, error: 'Attribute not found' };
            }
            const canDelete = await this.canDeleteAttribute(id);
            if (!canDelete.success) {
                return canDelete;
            }
            await attribute.destroy();
            return { success: true };
        }
        catch (error) {
            console.error('Error deleting attribute:', error);
            return { success: false, error: error.message };
        }
    }
    static async reorderAttributes(groupId, positions) {
        try {
            await Promise.all(positions.map(({ id, position }) => Models.Attribute.update({ position }, { where: { id, attribute_group_id: groupId } })));
            return { success: true };
        }
        catch (error) {
            console.error('Error reordering attributes:', error);
            return { success: false, error: error.message };
        }
    }
    static parseJsonFields(data) {
        const fieldsToParser = ['name', 'description', 'configuration'];
        const parsed = { ...data };
        fieldsToParser.forEach(field => {
            if (data[field]) {
                parsed[field] = typeof data[field] === 'string'
                    ? JSON.parse(data[field])
                    : data[field];
            }
        });
        return parsed;
    }
    static validateRequiredFields(data) {
        const requiredFields = ['name', 'handle', 'attribute_type', 'type'];
        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
    }
    static async canDeleteAttribute(id) {
        const attributeInUse = await Models.Attributable.findOne({
            where: { attribute_id: id }
        });
        if (attributeInUse) {
            return {
                success: false,
                error: 'Cannot delete attribute as it is being used by products'
            };
        }
        return { success: true };
    }
}
