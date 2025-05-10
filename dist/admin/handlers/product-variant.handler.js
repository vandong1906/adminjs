import { models } from '../../db/models/association.js';
import { AttributeDataCast } from '../field-types/attribute-data.cast.js';
export class ProductVariantHandler {
    static async getProductVariant(id) {
        try {
            const variant = await models.ProductVariant.findByPk(id, {
                include: [
                    { model: models.Product, as: 'product' },
                    { model: models.Media, as: 'media' }
                ],
            });
            if (!variant) {
                return { success: false, error: 'Product variant not found' };
            }
            const attributeData = variant.attribute_data
                ? AttributeDataCast.cast(variant.attribute_data)
                : {};
            return {
                success: true,
                variant: {
                    ...variant.toJSON(),
                    parsedAttributes: attributeData,
                },
            };
        }
        catch (error) {
            console.error('Error getting product variant:', error);
            return { success: false, error: error.message };
        }
    }
    static async createProductVariant(data) {
        try {
            const attributeData = data.attribute_data
                ? data.attribute_data
                : {};
            const variant = await models.ProductVariant.create({
                product_id: data.product_id,
                sku: data.sku || `VAR-${Date.now()}`,
                stock: data.stock || 0,
                unit_quantity: data.unit_quantity || 1,
                backorder: data.backorder,
                purchasable: data.purchasable || 'always',
                attribute_data: attributeData,
            });
            return {
                success: true,
                variant,
            };
        }
        catch (error) {
            console.error('Error creating product variant:', error);
            return { success: false, error: error.message };
        }
    }
    static async updateProductVariant(id, data) {
        try {
            const variant = await models.ProductVariant.findByPk(id);
            if (!variant) {
                return { success: false, error: 'Product variant not found' };
            }
            let attributeData = {};
            if (typeof data.attribute_data === 'string') {
                attributeData = JSON.parse(data.attribute_data);
            }
            else if (data.attribute_data) {
                attributeData = data.attribute_data;
            }
            await variant.update({
                product_id: data.product_id,
                sku: data.sku,
                stock: data.stock,
                unit_quantity: data.unit_quantity,
                backorder: data.backorder,
                purchasable: data.purchasable,
                attribute_data: attributeData,
            });
            return {
                success: true,
                variant,
            };
        }
        catch (error) {
            console.error('Error updating product variant:', error);
            return { success: false, error: error.message };
        }
    }
    static async deleteProductVariant(id) {
        try {
            const variant = await models.ProductVariant.findByPk(id);
            if (!variant) {
                return { success: false, error: 'Product variant not found' };
            }
            await models.MediaProductVariant.destroy({ where: { product_variant_id: id } });
            await variant.destroy();
            return {
                success: true,
            };
        }
        catch (error) {
            console.error('Error deleting product variant:', error);
            return { success: false, error: error.message };
        }
    }
}
