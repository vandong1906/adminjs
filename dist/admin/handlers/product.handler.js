import { models } from '../../db/models/association.js';
import { AttributeDataCast } from '../field-types/attribute-data.cast.js';
export class ProductHandler {
    static async getProduct(id) {
        try {
            const product = await models.Product.findByPk(id, {
                include: [
                    { model: models.ProductType, as: 'productType' },
                    { model: models.Brand, as: 'brand' },
                    { model: models.ProductVariant, as: 'variants' },
                    { model: models.Url, as: 'urls' },
                    { model: models.Collection, as: 'collections' },
                    { model: models.Media, as: 'media' },
                ],
            });
            if (!product) {
                return { success: false, error: 'Product not found' };
            }
            const attributeData = product.attribute_data
                ? AttributeDataCast.cast(product.attribute_data)
                : {};
            return {
                success: true,
                product: {
                    ...product.toJSON(),
                    parsedAttributes: attributeData,
                },
            };
        }
        catch (error) {
            console.error('Error getting product:', error);
            return { success: false, error: error.message };
        }
    }
    static async getProductAttributes(productTypeId) {
        try {
            const attributes = await models.Attribute.findAll({
                where: {
                    attribute_type: 'product',
                },
                order: [['position', 'ASC']],
            });
            return {
                success: true,
                attributes,
            };
        }
        catch (error) {
            console.error('Error getting product attributes:', error);
            return { success: false, error: error.message };
        }
    }
    static async createProduct(data) {
        try {
            const attributeData = data.attribute_data
                ? data.attribute_data
                : {};
            const product = await models.Product.create({
                product_type_id: data.product_type_id,
                status: data.status || 'draft',
                brand_id: data.brand_id,
                attribute_data: attributeData,
            });
            if (data.createDefaultVariant) {
                await models.ProductVariant.create({
                    product_id: product.id,
                    tax_class_id: data.tax_class_id,
                    sku: data.sku || `PROD-${product.id}`,
                    stock: data.stock || 0,
                    unit_quantity: 1,
                    purchasable: 'always',
                    attribute_data: {},
                });
            }
            return {
                success: true,
                product,
            };
        }
        catch (error) {
            console.error('Error creating product:', error);
            return { success: false, error: error.message };
        }
    }
    static async updateProduct(id, data) {
        try {
            const product = await models.Product.findByPk(id);
            if (!product) {
                return { success: false, error: 'Product not found' };
            }
            let attributeData = {};
            if (typeof data.attribute_data === 'string') {
                attributeData = JSON.parse(data.attribute_data);
            }
            else if (data.attribute_data) {
                attributeData = data.attribute_data;
            }
            await product.update({
                product_type_id: data.product_type_id,
                status: data.status,
                brand_id: data.brand_id,
                attribute_data: attributeData,
            });
            return {
                success: true,
                product,
            };
        }
        catch (error) {
            console.error('Error updating product:', error);
            return { success: false, error: error.message };
        }
    }
    static async deleteProduct(id) {
        try {
            const product = await models.Product.findByPk(id);
            if (!product) {
                return { success: false, error: 'Product not found' };
            }
            await models.ProductVariant.destroy({ where: { product_id: id } });
            await models.Url.destroy({ where: { element_id: id, element_type: 'product' } });
            await product.destroy();
            return {
                success: true,
            };
        }
        catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, error: error.message };
        }
    }
}
