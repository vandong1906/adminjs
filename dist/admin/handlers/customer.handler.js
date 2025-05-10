import { models } from '../../db/models/association.js';
import { Op, QueryTypes } from 'sequelize';
import sequelize from '../../db/config.js';
export class CustomerHandler {
    static async getCustomer(id) {
        try {
            const customer = await models.Customer.findByPk(id, {
                include: [
                    { model: models.CustomerGroup, as: 'customerGroups' },
                    { model: models.Order, as: 'orders' },
                    { model: models.Address, as: 'addresses' },
                ],
            });
            if (!customer) {
                return { success: false, error: 'Customer not found' };
            }
            return {
                success: true,
                customer: customer.toJSON(),
            };
        }
        catch (error) {
            console.error('Error getting customer:', error);
            return { success: false, error: error.message };
        }
    }
    static async getCustomers(params = {}) {
        try {
            const { page = 1, limit = 10, name, email, group_id, fromDate, toDate, sort = 'createdAt', order = 'DESC', } = params;
            const offset = (page - 1) * limit;
            const where = {};
            if (name) {
                where[Op.or] = [
                    { first_name: { [Op.like]: `%${name}%` } },
                    { last_name: { [Op.like]: `%${name}%` } },
                ];
            }
            if (email) {
                where.email = { [Op.like]: `%${email}%` };
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
            const include = [
                { model: models.CustomerGroup, as: 'customerGroups' },
            ];
            if (group_id) {
                include[0].where = { id: group_id };
            }
            const { count, rows } = await models.Customer.findAndCountAll({
                where,
                include,
                order: [[sort, order]],
                limit,
                offset,
                distinct: true,
            });
            return {
                success: true,
                customers: rows,
                pagination: {
                    total: count,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(count / limit),
                },
            };
        }
        catch (error) {
            console.error('Error getting customers:', error);
            return { success: false, error: error.message };
        }
    }
    static async createCustomer(data) {
        try {
            const customer = await models.Customer.create({
                title: data.title,
                first_name: data.first_name,
                last_name: data.last_name,
                meta: data.meta || {},
            });
            if (data.group_ids && Array.isArray(data.group_ids) && data.group_ids.length > 0) {
                for (const groupId of data.group_ids) {
                    await sequelize.query('INSERT INTO customer_customer_groups (customer_id, customer_group_id) VALUES (?, ?)', {
                        replacements: [customer.id, groupId],
                        type: QueryTypes.INSERT,
                    });
                }
            }
            return {
                success: true,
                customer,
            };
        }
        catch (error) {
            console.error('Error creating customer:', error);
            return { success: false, error: error.message };
        }
    }
    static async updateCustomer(id, data) {
        try {
            const customer = await models.Customer.findByPk(id);
            if (!customer) {
                return { success: false, error: 'Customer not found' };
            }
            await customer.update({
                title: data.title,
                first_name: data.first_name,
                last_name: data.last_name,
                meta: data.meta || {},
            });
            if (data.group_ids && Array.isArray(data.group_ids)) {
                await sequelize.query('DELETE FROM customer_customer_groups WHERE customer_id = ?', {
                    replacements: [id],
                    type: QueryTypes.DELETE,
                });
                if (data.group_ids.length > 0) {
                    for (const groupId of data.group_ids) {
                        await sequelize.query('INSERT INTO customer_customer_groups (customer_id, customer_group_id) VALUES (?, ?)', {
                            replacements: [customer.id, groupId],
                            type: QueryTypes.INSERT,
                        });
                    }
                }
            }
            return {
                success: true,
                customer,
            };
        }
        catch (error) {
            console.error('Error updating customer:', error);
            return { success: false, error: error.message };
        }
    }
    static async deleteCustomer(id) {
        try {
            const customer = await models.Customer.findByPk(id);
            if (!customer) {
                return { success: false, error: 'Customer not found' };
            }
            const [orderResults] = await sequelize.query('SELECT COUNT(*) as count FROM orders WHERE customer_id = ?', {
                replacements: [id],
                type: QueryTypes.SELECT,
            });
            if (orderResults && orderResults.count > 0) {
                return {
                    success: false,
                    error: 'Cannot delete customer with existing orders. Consider anonymizing the customer instead.'
                };
            }
            await sequelize.query('DELETE FROM customer_customer_groups WHERE customer_id = ?', {
                replacements: [id],
                type: QueryTypes.DELETE,
            });
            await models.Address.destroy({ where: { customer_id: id } });
            await customer.destroy();
            return {
                success: true,
            };
        }
        catch (error) {
            console.error('Error deleting customer:', error);
            return { success: false, error: error.message };
        }
    }
    static async anonymizeCustomer(id) {
        try {
            const customer = await models.Customer.findByPk(id);
            if (!customer) {
                return { success: false, error: 'Customer not found' };
            }
            const anonymousEmail = `anonymous-${Date.now()}@example.com`;
            await customer.update({
                first_name: 'Anonymous',
                last_name: 'User',
                meta: { anonymized: true, anonymized_at: new Date().toISOString() },
            });
            await sequelize.query('DELETE FROM customer_customer_groups WHERE customer_id = ?', {
                replacements: [id],
                type: QueryTypes.DELETE,
            });
            await models.Address.destroy({ where: { customer_id: id } });
            return {
                success: true,
                customer,
            };
        }
        catch (error) {
            console.error('Error anonymizing customer:', error);
            return { success: false, error: error.message };
        }
    }
    static async getCustomerGroups() {
        try {
            const groups = await models.CustomerGroup.findAll({
                order: [['name', 'ASC']],
            });
            return {
                success: true,
                groups,
            };
        }
        catch (error) {
            console.error('Error getting customer groups:', error);
            return { success: false, error: error.message };
        }
    }
    static async getCustomerStatistics() {
        try {
            const totalCustomers = await models.Customer.count();
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const newCustomers = await models.Customer.count({
                where: {
                    createdAt: { [Op.gte]: thirtyDaysAgo }
                }
            });
            const [topCustomers] = await sequelize.query(`SELECT 
          o.customer_id, 
          COUNT(o.id) as order_count,
          c.first_name,
          c.last_name
        FROM 
          orders o
        JOIN 
          customers c ON o.customer_id = c.id
        GROUP BY 
          o.customer_id, c.first_name, c.last_name
        ORDER BY 
          order_count DESC
        LIMIT 1`, {
                type: QueryTypes.SELECT,
            });
            const topCustomer = topCustomers ? {
                id: topCustomers.customer_id,
                name: `${topCustomers.first_name} ${topCustomers.last_name}`,
                orderCount: parseInt(topCustomers.order_count),
            } : null;
            const customersByGroupRaw = await sequelize.query(`SELECT 
          cg.id,
          cg.name,
          COUNT(ccg.customer_id) as customer_count
        FROM 
          customer_groups cg
        LEFT JOIN 
          customer_customer_groups ccg ON cg.id = ccg.customer_group_id
        GROUP BY 
          cg.id, cg.name`, {
                type: QueryTypes.SELECT,
            });
            const customersByGroup = Array.isArray(customersByGroupRaw) && customersByGroupRaw[0]
                ? customersByGroupRaw[0].map((g) => ({
                    id: g.id,
                    name: g.name,
                    count: parseInt(g.customer_count),
                }))
                : [];
            return {
                success: true,
                statistics: {
                    totalCustomers,
                    newCustomers,
                    topCustomer,
                    customersByGroup,
                },
            };
        }
        catch (error) {
            console.error('Error getting customer statistics:', error);
            return { success: false, error: error.message };
        }
    }
}
