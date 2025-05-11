import { models as Models } from '../../db/models/association.js';
export class AttributeGroupHandler {
    static async getAttributeGroups() {
        try {
            const groups = await Models.AttributeGroup.findAll({
                include: [{
                        model: Models.Attribute,
                        as: 'attributes'
                    }],
                order: [['position', 'ASC']]
            });
            return { success: true, groups };
        }
        catch (error) {
            console.error('Error fetching attribute groups:', error);
            return { success: false, error: error.message };
        }
    }
    static async getAttributeGroup(id) {
        try {
            const group = await Models.AttributeGroup.findByPk(id, {
                include: ['attributes']
            });
            if (!group) {
                return { success: false, error: 'Attribute group not found' };
            }
            return { success: true, group };
        }
        catch (error) {
            console.error('Error fetching attribute group:', error);
            return { success: false, error: error.message };
        }
    }
    static async createAttributeGroup(data) {
        try {
            const group = await Models.AttributeGroup.create({
                ...data,
                name: typeof data.name === 'string' ? JSON.parse(data.name) : data.name
            });
            return { success: true, group };
        }
        catch (error) {
            console.error('Error creating attribute group:', error);
            return { success: false, error: error.message };
        }
    }
    static async updateAttributeGroup(id, data) {
        try {
            const group = await Models.AttributeGroup.findByPk(id);
            if (!group) {
                return { success: false, error: 'Attribute group not found' };
            }
            await group.update({
                ...data,
                name: typeof data.name === 'string' ? JSON.parse(data.name) : data.name
            });
            return { success: true, group };
        }
        catch (error) {
            console.error('Error updating attribute group:', error);
            return { success: false, error: error.message };
        }
    }
    static async deleteAttributeGroup(id) {
        try {
            const group = await Models.AttributeGroup.findByPk(id);
            if (!group) {
                return { success: false, error: 'Attribute group not found' };
            }
            await group.destroy();
            return { success: true };
        }
        catch (error) {
            console.error('Error deleting attribute group:', error);
            return { success: false, error: error.message };
        }
    }
}
