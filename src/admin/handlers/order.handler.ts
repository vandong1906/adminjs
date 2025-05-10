import { models } from '../../db/models/association.js';
import { Op } from 'sequelize';
import sequelize from '../../db/config.js';

// Define interfaces for parameters
interface OrderFilterParams {
  page?: number;
  limit?: number;
  status?: string;
  customer_id?: number;
  reference?: string;
  fromDate?: string;
  toDate?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

interface DateRangeParams {
  fromDate?: string;
  toDate?: string;
}

/**
 * Handler for order-related operations in the admin panel
 */
export class OrderHandler {
  /**
   * Get an order by ID with all related data
   */
  static async getOrder(id: number | string) {
    try {
      // Get order with all related data
      const order = await models.Order.findByPk(id, {
        include: [
          { model: models.Customer, as: 'customer' },
          { model: models.OrderLine, as: 'lines' },
          { model: models.OrderAddress, as: 'shippingAddress' },
          { model: models.OrderAddress, as: 'billingAddress' },
          { model: models.Transaction, as: 'transactions' },
        ],
      });

      if (!order) {
        return { success: false, error: 'Order not found' };
      }

      return {
        success: true,
        order: order.toJSON(),
      };
    } catch (error) {
      console.error('Error getting order:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get orders with pagination and filters
   */
  static async getOrders(params: OrderFilterParams = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        customer_id,
        reference,
        fromDate,
        toDate,
        sort = 'createdAt',
        order = 'DESC',
      } = params;

      const offset = (page - 1) * limit;
      
      // Build where clause based on filters
      const where: any = {};
      
      if (status) {
        where.status = status;
      }
      
      if (customer_id) {
        where.customer_id = customer_id;
      }
      
      if (reference) {
        where.reference = { [Op.like]: `%${reference}%` };
      }
      
      // Date range filter
      if (fromDate || toDate) {
        where.createdAt = {};
        
        if (fromDate) {
          where.createdAt[Op.gte] = new Date(fromDate);
        }
        
        if (toDate) {
          where.createdAt[Op.lte] = new Date(toDate);
        }
      }

      // Get orders with pagination
      const { count, rows } = await models.Order.findAndCountAll({
        where,
        include: [
          { model: models.Customer, as: 'customer' },
        ],
        order: [[sort, order]],
        limit,
        offset,
      });

      return {
        success: true,
        orders: rows,
        pagination: {
          total: count,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (error) {
      console.error('Error getting orders:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Update an order's status
   */
  static async updateOrderStatus(id: number | string, status: string) {
    try {
      const order = await models.Order.findByPk(id);

      if (!order) {
        return { success: false, error: 'Order not found' };
      }

      await order.update({ status });

      return {
        success: true,
        order,
      };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Cancel an order
   */
  static async cancelOrder(id: number | string, reason?: string) {
    try {
      const order = await models.Order.findByPk(id);

      if (!order) {
        return { success: false, error: 'Order not found' };
      }

      // Only allow cancellation for certain statuses
      const cancelableStatuses = ['pending', 'awaiting_payment', 'processing'];
      
      if (!cancelableStatuses.includes(order.status)) {
        return { 
          success: false, 
          error: `Cannot cancel order with status "${order.status}". Order must be in one of these statuses: ${cancelableStatuses.join(', ')}`
        };
      }

      // Update order status and add cancellation notes
      await order.update({ 
        status: 'cancelled',
        notes: reason ? `Cancelled: ${reason}` : 'Order cancelled',
      });

      return {
        success: true,
        order,
      };
    } catch (error) {
      console.error('Error cancelling order:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get order statistics
   */
  static async getOrderStatistics(params: DateRangeParams = {}) {
    try {
      const { fromDate, toDate } = params;
      const dateCondition: any = {};
      
      if (fromDate || toDate) {
        if (fromDate) {
          dateCondition[Op.gte] = new Date(fromDate);
        }
        
        if (toDate) {
          dateCondition[Op.lte] = new Date(toDate);
        }
      }

      // Get total orders count
      const totalOrders = await models.Order.count({
        where: fromDate || toDate ? { createdAt: dateCondition } : {},
      });

      // Get orders by status
      const ordersByStatus = await models.Order.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        ],
        where: fromDate || toDate ? { createdAt: dateCondition } : {},
        group: ['status'],
      });

      // Get total revenue (from completed orders)
      const revenueResult = await models.Order.sum('total', {
        where: { 
          status: 'completed',
          ...(fromDate || toDate ? { createdAt: dateCondition } : {}),
        },
      });

      // Format revenue
      const revenue = revenueResult || 0;

      // Get average order value
      const avgOrderValue = totalOrders > 0 ? revenue / totalOrders : 0;

      return {
        success: true,
        statistics: {
          totalOrders,
          revenue,
          avgOrderValue,
          ordersByStatus: ordersByStatus.map(s => ({
            status: s.status,
            count: Number(s.get('count')),
          })),
        },
      };
    } catch (error) {
      console.error('Error getting order statistics:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Add a note to an order
   */
  static async addOrderNote(id: number | string, note: string) {
    try {
      const order = await models.Order.findByPk(id);

      if (!order) {
        return { success: false, error: 'Order not found' };
      }

      const currentNotes = order.notes || '';
      const timestamp = new Date().toISOString();
      const newNote = `[${timestamp}] ${note}`;
      
      // Append new note to existing notes
      const updatedNotes = currentNotes ? `${currentNotes}\n\n${newNote}` : newNote;
      
      await order.update({ notes: updatedNotes });

      return {
        success: true,
        order,
      };
    } catch (error) {
      console.error('Error adding order note:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Generate a unique order reference
   */
  static async generateOrderReference() {
    try {
      // Get current timestamp
      const timestamp = Date.now().toString().slice(-6);
      const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      
      // Combine timestamp and random part
      const reference = `ORD-${timestamp}${randomPart}`;
      
      // Check if reference already exists
      const existingOrder = await models.Order.findOne({ where: { reference } });
      
      // If exists, generate a new one recursively
      if (existingOrder) {
        return this.generateOrderReference();
      }
      
      return reference;
    } catch (error) {
      console.error('Error generating order reference:', error);
      throw error;
    }
  }
} 