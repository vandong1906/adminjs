import { models } from '../../db/models/association.js';
import { AttributeDataCast } from '../field-types/attribute-data.cast.js';

/**
 * Handler for product variant-related operations in the admin panel
 */
export class ProductVariantHandler {
  /**
   * Get a product variant by ID with all related data
   */
  static async getProductVariant(id) {
    try {
      // Get product variant with all related data
      const variant = await models.ProductVariant.findByPk(id, {
        include: [
          { model: models.Product, as: 'product' },
          { model: models.Media, as: 'media' }
        ],
      });

      if (!variant) {
        return { success: false, error: 'Product variant not found' };
      }

      // Parse attribute data
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
    } catch (error) {
      console.error('Error getting product variant:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a new product variant
   */
  static async createProductVariant(data) {
    try {
      // Parse and validate the attribute data
      const attributeData = data.attribute_data 
        ? data.attribute_data 
        : {};

      // Create the product variant
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
    } catch (error) {
      console.error('Error creating product variant:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Update a product variant
   */
  static async updateProductVariant(id, data) {
    try {
      const variant = await models.ProductVariant.findByPk(id);

      if (!variant) {
        return { success: false, error: 'Product variant not found' };
      }

      // Prepare attribute data for update
      let attributeData = {};
      if (typeof data.attribute_data === 'string') {
        attributeData = JSON.parse(data.attribute_data);
      } else if (data.attribute_data) {
        attributeData = data.attribute_data;
      }

      // Update the product variant
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
    } catch (error) {
      console.error('Error updating product variant:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Delete a product variant
   */
  static async deleteProductVariant(id) {
    try {
      const variant = await models.ProductVariant.findByPk(id);

      if (!variant) {
        return { success: false, error: 'Product variant not found' };
      }

      // Delete media relationships first
      await models.MediaProductVariant.destroy({ where: { product_variant_id: id } });

      // Delete the variant
      await variant.destroy();

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error deleting product variant:', error);
      return { success: false, error: error.message };
    }
  }
} 