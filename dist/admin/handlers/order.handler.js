import { models } from '../../db/models/association.js';
import { Op } from 'sequelize';
import sequelize from '../../db/config.js';
export class OrderHandler {
    static async getOrder(id) {
        try {
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
        }
        catch (error) {
            console.error('Error getting order:', error);
            return { success: false, error: error.message };
        }
    }
    static async getOrders(params = {}) {
        try {
            const { page = 1, limit = 10, status, customer_id, reference, fromDate, toDate, sort = 'createdAt', order = 'DESC', } = params;
            const offset = (page - 1) * limit;
            const where = {};
            if (status) {
                where.status = status;
            }
            if (customer_id) {
                where.customer_id = customer_id;
            }
            if (reference) {
                where.reference = { [Op.like]: `%${reference}%` };
            }
            if (fromDate || toDate) {
                where.createdAt = {};
                if (fromDate) {
                    where.createdAt[Op.gte] = new Date(fromDate);
                }
                if (toDate) {
                    where.createdAt[Op.lte] = new Date(toDate);
                }
            }
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
        }
        catch (error) {
            console.error('Error getting orders:', error);
            return { success: false, error: error.message };
        }
    }
    static async updateOrderStatus(id, status) {
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
        }
        catch (error) {
            console.error('Error updating order status:', error);
            return { success: false, error: error.message };
        }
    }
    static async cancelOrder(id, reason) {
        try {
            const order = await models.Order.findByPk(id);
            if (!order) {
                return { success: false, error: 'Order not found' };
            }
            const cancelableStatuses = ['pending', 'awaiting_payment', 'processing'];
            if (!cancelableStatuses.includes(order.status)) {
                return {
                    success: false,
                    error: `Cannot cancel order with status "${order.status}". Order must be in one of these statuses: ${cancelableStatuses.join(', ')}`
                };
            }
            await order.update({
                status: 'cancelled',
                notes: reason ? `Cancelled: ${reason}` : 'Order cancelled',
            });
            return {
                success: true,
                order,
            };
        }
        catch (error) {
            console.error('Error cancelling order:', error);
            return { success: false, error: error.message };
        }
    }
    static async getOrderStatistics(params = {}) {
        try {
            const { fromDate, toDate } = params;
            const dateCondition = {};
            if (fromDate || toDate) {
                if (fromDate) {
                    dateCondition[Op.gte] = new Date(fromDate);
                }
                if (toDate) {
                    dateCondition[Op.lte] = new Date(toDate);
                }
            }
            const totalOrders = await models.Order.count({
                where: fromDate || toDate ? { createdAt: dateCondition } : {},
            });
            const ordersByStatus = await models.Order.findAll({
                attributes: [
                    'status',
                    [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
                ],
                where: fromDate || toDate ? { createdAt: dateCondition } : {},
                group: ['status'],
            });
            const revenueResult = await models.Order.sum('total', {
                where: {
                    status: 'completed',
                    ...(fromDate || toDate ? { createdAt: dateCondition } : {}),
                },
            });
            const revenue = revenueResult || 0;
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
        }
        catch (error) {
            console.error('Error getting order statistics:', error);
            return { success: false, error: error.message };
        }
    }
    static async addOrderNote(id, note) {
        try {
            const order = await models.Order.findByPk(id);
            if (!order) {
                return { success: false, error: 'Order not found' };
            }
            const currentNotes = order.notes || '';
            const timestamp = new Date().toISOString();
            const newNote = `[${timestamp}] ${note}`;
            const updatedNotes = currentNotes ? `${currentNotes}\n\n${newNote}` : newNote;
            await order.update({ notes: updatedNotes });
            return {
                success: true,
                order,
            };
        }
        catch (error) {
            console.error('Error adding order note:', error);
            return { success: false, error: error.message };
        }
    }
    static async generateOrderReference() {
        try {
            const timestamp = Date.now().toString().slice(-6);
            const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            const reference = `ORD-${timestamp}${randomPart}`;
            const existingOrder = await models.Order.findOne({ where: { reference } });
            if (existingOrder) {
                return this.generateOrderReference();
            }
            return reference;
        }
        catch (error) {
            console.error('Error generating order reference:', error);
            throw error;
        }
    }
}
