import { models } from '../../db/models/association.js';
import { Op, QueryTypes } from 'sequelize';
import sequelize from '../../db/config.js';
import { IDiscount } from '../../db/models/discounts.entity.js';

// Define interfaces for parameters
interface DiscountFilterParams {
  page?: number;
  limit?: number;
  code?: string;
  type?: string;
  isActive?: boolean;
  fromDate?: string;
  toDate?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

/**
 * Handler for discount-related operations in the admin panel
 */
export class DiscountHandler {
  /**
   * Get a discount by ID
   */
  static async getDiscount(id: number | string) {
    try {
      // Get discount with related data
      const discount = await models.Discount.findByPk(id, {
        include: [
          { model: models.Product, as: 'products' },
          { model: models.Collection, as: 'collections' },
          { model: models.CustomerGroup, as: 'customerGroups' },
        ],
      });

      if (!discount) {
        return { success: false, error: 'Discount not found' };
      }

      return {
        success: true,
        discount: discount.toJSON(),
      };
    } catch (error: any) {
      console.error('Error getting discount:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get discounts with pagination and filters
   */
  static async getDiscounts(params: DiscountFilterParams = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        code,
        type,
        isActive,
        fromDate,
        toDate,
        sort = 'createdAt',
        order = 'DESC',
      } = params;

      const offset = (page - 1) * limit;
      
      // Build where clause based on filters
      const where: any = {};
      
      if (code) {
        where.code = { [Op.like]: `%${code}%` };
      }
      
      if (type) {
        where.type = type;
      }
      
      if (isActive !== undefined) {
        // Check if currently active (current date is between starts_at and ends_at)
        const currentDate = new Date();
        
        if (isActive) {
          where[Op.and] = [
            { starts_at: { [Op.lte]: currentDate } },
            { 
              [Op.or]: [
                { ends_at: { [Op.gte]: currentDate } },
                { ends_at: null }
              ]
            }
          ];
        } else {
          where[Op.or] = [
            { starts_at: { [Op.gt]: currentDate } },
            { ends_at: { [Op.lt]: currentDate } }
          ];
        }
      }
      
      // Date range filter for creation date
      if (fromDate || toDate) {
        where.createdAt = {};
        
        if (fromDate) {
          where.createdAt[Op.gte] = new Date(fromDate);
        }
        
        if (toDate) {
          where.createdAt[Op.lte] = new Date(toDate);
        }
      }

      // Get discounts with pagination
      const { count, rows } = await models.Discount.findAndCountAll({
        where,
        order: [[sort, order]],
        limit,
        offset,
      });

      return {
        success: true,
        discounts: rows,
        pagination: {
          total: count,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (error: any) {
      console.error('Error getting discounts:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a new discount
   */
  static async createDiscount(data: any) {
    try {
      // Validate discount code uniqueness
      const existingDiscount = await models.Discount.findOne({
        where: { code: data.code } as any
      });

      if (existingDiscount) {
        return { success: false, error: 'Discount code already exists' };
      }

      // Create the discount
      const discount = await models.Discount.create({
        name: data.name,
        code: data.code,
        handle: data.code.toLowerCase().replace(/\s+/g, '-'), // Generate handle from code
        type: data.type || 'percentage', // percentage or fixed
        value: data.value,
        min_order_value: data.min_order_value || 0,
        max_uses: data.max_uses || null,
        used_count: 0,
        is_active: data.is_active !== undefined ? data.is_active : true,
        starts_at: data.starts_at ? new Date(data.starts_at) : new Date(),
        ends_at: data.ends_at ? new Date(data.ends_at) : null,
        priority: 0, // Default priority
        stop: false, // Default stop behavior
      });

      // Associate products if provided
      if (data.product_ids && Array.isArray(data.product_ids) && data.product_ids.length > 0) {
        for (const productId of data.product_ids) {
          await sequelize.query(
            'INSERT INTO discount_products (discount_id, product_id) VALUES (?, ?)',
            {
              replacements: [discount.id, productId],
              type: QueryTypes.INSERT,
            }
          );
        }
      }

      // Associate collections if provided
      if (data.collection_ids && Array.isArray(data.collection_ids) && data.collection_ids.length > 0) {
        for (const collectionId of data.collection_ids) {
          await sequelize.query(
            'INSERT INTO discount_collections (discount_id, collection_id) VALUES (?, ?)',
            {
              replacements: [discount.id, collectionId],
              type: QueryTypes.INSERT,
            }
          );
        }
      }

      // Associate customer groups if provided
      if (data.customer_group_ids && Array.isArray(data.customer_group_ids) && data.customer_group_ids.length > 0) {
        for (const groupId of data.customer_group_ids) {
          await sequelize.query(
            'INSERT INTO discount_customer_groups (discount_id, customer_group_id) VALUES (?, ?)',
            {
              replacements: [discount.id, groupId],
              type: QueryTypes.INSERT,
            }
          );
        }
      }

      return {
        success: true,
        discount,
      };
    } catch (error: any) {
      console.error('Error creating discount:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Update a discount
   */
  static async updateDiscount(id: number | string, data: any) {
    try {
      const discount = await models.Discount.findByPk(id);

      if (!discount) {
        return { success: false, error: 'Discount not found' };
      }

      // Check code uniqueness if changed
      if (data.code && data.code !== discount.code) {
        const existingDiscount = await models.Discount.findOne({
          where: { code: data.code } as any
        });

        if (existingDiscount) {
          return { success: false, error: 'Discount code already exists' };
        }
      }

      // Update discount data
      await discount.update({
        name: data.name,
        code: data.code,
        handle: data.code.toLowerCase().replace(/\s+/g, '-'), // Update handle if code changes
        type: data.type,
        value: data.value,
        min_order_value: data.min_order_value,
        max_uses: data.max_uses,
        starts_at: data.starts_at ? new Date(data.starts_at) : discount.starts_at,
        ends_at: data.ends_at ? new Date(data.ends_at) : discount.ends_at,
        is_active: data.is_active !== undefined ? data.is_active : discount.is_active,
      });

      // Update product associations if provided
      if (data.product_ids && Array.isArray(data.product_ids)) {
        // Remove existing associations
        await sequelize.query(
          'DELETE FROM discount_products WHERE discount_id = ?',
          {
            replacements: [id],
            type: QueryTypes.DELETE,
          }
        );

        // Create new associations
        if (data.product_ids.length > 0) {
          for (const productId of data.product_ids) {
            await sequelize.query(
              'INSERT INTO discount_products (discount_id, product_id) VALUES (?, ?)',
              {
                replacements: [discount.id, productId],
                type: QueryTypes.INSERT,
              }
            );
          }
        }
      }

      // Update collection associations if provided
      if (data.collection_ids && Array.isArray(data.collection_ids)) {
        // Remove existing associations
        await sequelize.query(
          'DELETE FROM discount_collections WHERE discount_id = ?',
          {
            replacements: [id],
            type: QueryTypes.DELETE,
          }
        );

        // Create new associations
        if (data.collection_ids.length > 0) {
          for (const collectionId of data.collection_ids) {
            await sequelize.query(
              'INSERT INTO discount_collections (discount_id, collection_id) VALUES (?, ?)',
              {
                replacements: [discount.id, collectionId],
                type: QueryTypes.INSERT,
              }
            );
          }
        }
      }

      // Update customer group associations if provided
      if (data.customer_group_ids && Array.isArray(data.customer_group_ids)) {
        // Remove existing associations
        await sequelize.query(
          'DELETE FROM discount_customer_groups WHERE discount_id = ?',
          {
            replacements: [id],
            type: QueryTypes.DELETE,
          }
        );

        // Create new associations
        if (data.customer_group_ids.length > 0) {
          for (const groupId of data.customer_group_ids) {
            await sequelize.query(
              'INSERT INTO discount_customer_groups (discount_id, customer_group_id) VALUES (?, ?)',
              {
                replacements: [discount.id, groupId],
                type: QueryTypes.INSERT,
              }
            );
          }
        }
      }

      return {
        success: true,
        discount,
      };
    } catch (error: any) {
      console.error('Error updating discount:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Delete a discount
   */
  static async deleteDiscount(id: number | string) {
    try {
      const discount = await models.Discount.findByPk(id);

      if (!discount) {
        return { success: false, error: 'Discount not found' };
      }

      // Check if discount has been used in orders
      const usedCount = await models.Order.count({
        where: { discount_id: id } as any
      });

      if (usedCount > 0) {
        return { 
          success: false, 
          error: 'Cannot delete discount that has been used in orders. Consider deactivating it instead.' 
        };
      }

      // Delete related associations
      await sequelize.query(
        'DELETE FROM discount_products WHERE discount_id = ?',
        {
          replacements: [id],
          type: QueryTypes.DELETE,
        }
      );
      
      await sequelize.query(
        'DELETE FROM discount_collections WHERE discount_id = ?',
        {
          replacements: [id],
          type: QueryTypes.DELETE,
        }
      );
      
      await sequelize.query(
        'DELETE FROM discount_customer_groups WHERE discount_id = ?',
        {
          replacements: [id],
          type: QueryTypes.DELETE,
        }
      );

      // Delete the discount
      await discount.destroy();

      return {
        success: true,
      };
    } catch (error: any) {
      console.error('Error deleting discount:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Check if a discount is valid
   */
  static async validateDiscount(code: string, customerId?: number, cartTotal?: number) {
    try {
      // Find discount by code
      const discount = await models.Discount.findOne({
        where: { code } as any,
        include: [
          { model: models.CustomerGroup, as: 'customerGroups' },
        ],
      });

      if (!discount) {
        return { success: false, error: 'Discount not found' };
      }

      // Check if discount is active
      const currentDate = new Date();
      
      if (discount.starts_at && new Date(discount.starts_at) > currentDate) {
        return { success: false, error: 'Discount is not active yet' };
      }
      
      if (discount.ends_at && new Date(discount.ends_at) < currentDate) {
        return { success: false, error: 'Discount has expired' };
      }
      
      if (!discount.is_active) {
        return { success: false, error: 'Discount is inactive' };
      }

      // Check max uses
      if (discount.max_uses !== null && discount.used_count >= discount.max_uses) {
        return { success: false, error: 'Discount usage limit has been reached' };
      }

      // Check minimum order value
      if (cartTotal !== undefined && discount.min_order_value > 0 && cartTotal < discount.min_order_value) {
        return { 
          success: false, 
          error: `Order total must be at least ${discount.min_order_value} to use this discount` 
        };
      }

      // Check customer group restriction if customer ID is provided
      if (customerId && discount.customerGroups && discount.customerGroups.length > 0) {
        // Get customer's groups
        const customerGroups = await sequelize.query(
          `SELECT customer_group_id FROM customer_customer_groups WHERE customer_id = ?`,
          {
            replacements: [customerId],
            type: QueryTypes.SELECT,
          }
        );
        
        // Extract group IDs
        const customerGroupIds = (customerGroups as any[]).map(g => g.customer_group_id);
        
        // Check if customer belongs to at least one of the required groups
        const discountGroupIds = discount.customerGroups.map(g => g.id);
        const hasMatchingGroup = customerGroupIds.some(id => discountGroupIds.includes(id));
        
        if (!hasMatchingGroup) {
          return { success: false, error: 'Discount is not available for your customer group' };
        }
      }

      // Calculate discount amount
      let discountAmount = 0;
      
      if (cartTotal) {
        if (discount.type === 'percentage') {
          discountAmount = (cartTotal * discount.value) / 100;
        } else {
          discountAmount = discount.value;
        }
      }

      return {
        success: true,
        discount: {
          ...discount.toJSON(),
          discountAmount,
        },
      };
    } catch (error: any) {
      console.error('Error validating discount:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get discount statistics
   */
  static async getDiscountStatistics() {
    try {
      // Total discounts
      const totalDiscounts = await models.Discount.count();

      // Active discounts
      const currentDate = new Date();
      const activeDiscounts = await models.Discount.count({
        where: {
          is_active: true,
          starts_at: { [Op.lte]: currentDate },
          [Op.or]: [
            { ends_at: { [Op.gte]: currentDate } },
            { ends_at: null }
          ]
        } as any
      });

      // Most used discount
      const mostUsedDiscount = await models.Discount.findOne({
        order: [['used_count', 'DESC']],
        limit: 1,
      });

      // Total discount amount (from orders)
      const discountAmountResult = await sequelize.query(
        `SELECT SUM(discount_total) as total_discount FROM orders WHERE discount_id IS NOT NULL`,
        {
          type: QueryTypes.SELECT,
        }
      );
      
      const totalDiscountAmount = 
        discountAmountResult && 
        discountAmountResult[0] && 
        'total_discount' in discountAmountResult[0] &&
        discountAmountResult[0].total_discount !== null
          ? parseFloat(discountAmountResult[0].total_discount as string)
          : 0;

      return {
        success: true,
        statistics: {
          totalDiscounts,
          activeDiscounts,
          mostUsedDiscount: mostUsedDiscount ? {
            id: mostUsedDiscount.id,
            code: mostUsedDiscount.code,
            name: mostUsedDiscount.name,
            usedCount: mostUsedDiscount.used_count,
          } : null,
          totalDiscountAmount,
        },
      };
    } catch (error: any) {
      console.error('Error getting discount statistics:', error);
      return { success: false, error: error.message };
    }
  }
} 