import { models } from '../../db/models/association.js';
import { AttributeDataCast } from '../field-types/attribute-data.cast.js';

/**
 * Handler for product-related operations in the admin panel
 */
export class ProductHandler {
  /**
   * Get a product by ID with all related data
   */
  static async getProduct(id) {
    try {
      // Get product with all related data
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

      // Parse attribute data
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
    } catch (error) {
      console.error('Error getting product:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get product attributes for a given product type
   */
  static async getProductAttributes(productTypeId) {
    try {
      // Get attributes for the product type
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
    } catch (error) {
      console.error('Error getting product attributes:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a new product
   */
  static async createProduct(data) {
    try {
      // Parse and validate the attribute data
      const attributeData = data.attribute_data 
        ? data.attribute_data 
        : {};

      // Create the product
      const product = await models.Product.create({
        product_type_id: data.product_type_id,
        status: data.status || 'draft',
        brand_id: data.brand_id,
        attribute_data: attributeData,
      });

      // Create default variant if needed
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
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Update a product
   */
  static async updateProduct(id, data) {
    try {
      const product = await models.Product.findByPk(id);

      if (!product) {
        return { success: false, error: 'Product not found' };
      }

      // Prepare attribute data for update
      let attributeData = {};
      if (typeof data.attribute_data === 'string') {
        attributeData = JSON.parse(data.attribute_data);
      } else if (data.attribute_data) {
        attributeData = data.attribute_data;
      }

      // Update the product
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
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Delete a product
   */
  static async deleteProduct(id) {
    try {
      const product = await models.Product.findByPk(id);

      if (!product) {
        return { success: false, error: 'Product not found' };
      }

      // Delete related data first
      await models.ProductVariant.destroy({ where: { product_id: id } });
      await models.Url.destroy({ where: { element_id: id, element_type: 'product' } });

      // Delete the product
      await product.destroy();

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, error: error.message };
    }
  }
} 