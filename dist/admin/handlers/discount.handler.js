import { models } from '../../db/models/association.js';
import { Op, QueryTypes } from 'sequelize';
import sequelize from '../../db/config.js';
export class DiscountHandler {
    static async getDiscount(id) {
        try {
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
        }
        catch (error) {
            console.error('Error getting discount:', error);
            return { success: false, error: error.message };
        }
    }
    static async getDiscounts(params = {}) {
        try {
            const { page = 1, limit = 10, code, type, isActive, fromDate, toDate, sort = 'createdAt', order = 'DESC', } = params;
            const offset = (page - 1) * limit;
            const where = {};
            if (code) {
                where.code = { [Op.like]: `%${code}%` };
            }
            if (type) {
                where.type = type;
            }
            if (isActive !== undefined) {
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
                }
                else {
                    where[Op.or] = [
                        { starts_at: { [Op.gt]: currentDate } },
                        { ends_at: { [Op.lt]: currentDate } }
                    ];
                }
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
        }
        catch (error) {
            console.error('Error getting discounts:', error);
            return { success: false, error: error.message };
        }
    }
    static async createDiscount(data) {
        try {
            const existingDiscount = await models.Discount.findOne({
                where: { code: data.code }
            });
            if (existingDiscount) {
                return { success: false, error: 'Discount code already exists' };
            }
            const discount = await models.Discount.create({
                name: data.name,
                code: data.code,
                handle: data.code.toLowerCase().replace(/\s+/g, '-'),
                type: data.type || 'percentage',
                value: data.value,
                min_order_value: data.min_order_value || 0,
                max_uses: data.max_uses || null,
                used_count: 0,
                is_active: data.is_active !== undefined ? data.is_active : true,
                starts_at: data.starts_at ? new Date(data.starts_at) : new Date(),
                ends_at: data.ends_at ? new Date(data.ends_at) : null,
                priority: 0,
                stop: false,
            });
            if (data.product_ids && Array.isArray(data.product_ids) && data.product_ids.length > 0) {
                for (const productId of data.product_ids) {
                    await sequelize.query('INSERT INTO discount_products (discount_id, product_id) VALUES (?, ?)', {
                        replacements: [discount.id, productId],
                        type: QueryTypes.INSERT,
                    });
                }
            }
            if (data.collection_ids && Array.isArray(data.collection_ids) && data.collection_ids.length > 0) {
                for (const collectionId of data.collection_ids) {
                    await sequelize.query('INSERT INTO discount_collections (discount_id, collection_id) VALUES (?, ?)', {
                        replacements: [discount.id, collectionId],
                        type: QueryTypes.INSERT,
                    });
                }
            }
            if (data.customer_group_ids && Array.isArray(data.customer_group_ids) && data.customer_group_ids.length > 0) {
                for (const groupId of data.customer_group_ids) {
                    await sequelize.query('INSERT INTO discount_customer_groups (discount_id, customer_group_id) VALUES (?, ?)', {
                        replacements: [discount.id, groupId],
                        type: QueryTypes.INSERT,
                    });
                }
            }
            return {
                success: true,
                discount,
            };
        }
        catch (error) {
            console.error('Error creating discount:', error);
            return { success: false, error: error.message };
        }
    }
    static async updateDiscount(id, data) {
        try {
            const discount = await models.Discount.findByPk(id);
            if (!discount) {
                return { success: false, error: 'Discount not found' };
            }
            if (data.code && data.code !== discount.code) {
                const existingDiscount = await models.Discount.findOne({
                    where: { code: data.code }
                });
                if (existingDiscount) {
                    return { success: false, error: 'Discount code already exists' };
                }
            }
            await discount.update({
                name: data.name,
                code: data.code,
                handle: data.code.toLowerCase().replace(/\s+/g, '-'),
                type: data.type,
                value: data.value,
                min_order_value: data.min_order_value,
                max_uses: data.max_uses,
                starts_at: data.starts_at ? new Date(data.starts_at) : discount.starts_at,
                ends_at: data.ends_at ? new Date(data.ends_at) : discount.ends_at,
                is_active: data.is_active !== undefined ? data.is_active : discount.is_active,
            });
            if (data.product_ids && Array.isArray(data.product_ids)) {
                await sequelize.query('DELETE FROM discount_products WHERE discount_id = ?', {
                    replacements: [id],
                    type: QueryTypes.DELETE,
                });
                if (data.product_ids.length > 0) {
                    for (const productId of data.product_ids) {
                        await sequelize.query('INSERT INTO discount_products (discount_id, product_id) VALUES (?, ?)', {
                            replacements: [discount.id, productId],
                            type: QueryTypes.INSERT,
                        });
                    }
                }
            }
            if (data.collection_ids && Array.isArray(data.collection_ids)) {
                await sequelize.query('DELETE FROM discount_collections WHERE discount_id = ?', {
                    replacements: [id],
                    type: QueryTypes.DELETE,
                });
                if (data.collection_ids.length > 0) {
                    for (const collectionId of data.collection_ids) {
                        await sequelize.query('INSERT INTO discount_collections (discount_id, collection_id) VALUES (?, ?)', {
                            replacements: [discount.id, collectionId],
                            type: QueryTypes.INSERT,
                        });
                    }
                }
            }
            if (data.customer_group_ids && Array.isArray(data.customer_group_ids)) {
                await sequelize.query('DELETE FROM discount_customer_groups WHERE discount_id = ?', {
                    replacements: [id],
                    type: QueryTypes.DELETE,
                });
                if (data.customer_group_ids.length > 0) {
                    for (const groupId of data.customer_group_ids) {
                        await sequelize.query('INSERT INTO discount_customer_groups (discount_id, customer_group_id) VALUES (?, ?)', {
                            replacements: [discount.id, groupId],
                            type: QueryTypes.INSERT,
                        });
                    }
                }
            }
            return {
                success: true,
                discount,
            };
        }
        catch (error) {
            console.error('Error updating discount:', error);
            return { success: false, error: error.message };
        }
    }
    static async deleteDiscount(id) {
        try {
            const discount = await models.Discount.findByPk(id);
            if (!discount) {
                return { success: false, error: 'Discount not found' };
            }
            const usedCount = await models.Order.count({
                where: { discount_id: id }
            });
            if (usedCount > 0) {
                return {
                    success: false,
                    error: 'Cannot delete discount that has been used in orders. Consider deactivating it instead.'
                };
            }
            await sequelize.query('DELETE FROM discount_products WHERE discount_id = ?', {
                replacements: [id],
                type: QueryTypes.DELETE,
            });
            await sequelize.query('DELETE FROM discount_collections WHERE discount_id = ?', {
                replacements: [id],
                type: QueryTypes.DELETE,
            });
            await sequelize.query('DELETE FROM discount_customer_groups WHERE discount_id = ?', {
                replacements: [id],
                type: QueryTypes.DELETE,
            });
            await discount.destroy();
            return {
                success: true,
            };
        }
        catch (error) {
            console.error('Error deleting discount:', error);
            return { success: false, error: error.message };
        }
    }
    static async validateDiscount(code, customerId, cartTotal) {
        try {
            const discount = await models.Discount.findOne({
                where: { code },
                include: [
                    { model: models.CustomerGroup, as: 'customerGroups' },
                ],
            });
            if (!discount) {
                return { success: false, error: 'Discount not found' };
            }
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
            if (discount.max_uses !== null && discount.used_count >= discount.max_uses) {
                return { success: false, error: 'Discount usage limit has been reached' };
            }
            if (cartTotal !== undefined && discount.min_order_value > 0 && cartTotal < discount.min_order_value) {
                return {
                    success: false,
                    error: `Order total must be at least ${discount.min_order_value} to use this discount`
                };
            }
            if (customerId && discount.customerGroups && discount.customerGroups.length > 0) {
                const customerGroups = await sequelize.query(`SELECT customer_group_id FROM customer_customer_groups WHERE customer_id = ?`, {
                    replacements: [customerId],
                    type: QueryTypes.SELECT,
                });
                const customerGroupIds = customerGroups.map(g => g.customer_group_id);
                const discountGroupIds = discount.customerGroups.map(g => g.id);
                const hasMatchingGroup = customerGroupIds.some(id => discountGroupIds.includes(id));
                if (!hasMatchingGroup) {
                    return { success: false, error: 'Discount is not available for your customer group' };
                }
            }
            let discountAmount = 0;
            if (cartTotal) {
                if (discount.type === 'percentage') {
                    discountAmount = (cartTotal * discount.value) / 100;
                }
                else {
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
        }
        catch (error) {
            console.error('Error validating discount:', error);
            return { success: false, error: error.message };
        }
    }
    static async getDiscountStatistics() {
        try {
            const totalDiscounts = await models.Discount.count();
            const currentDate = new Date();
            const activeDiscounts = await models.Discount.count({
                where: {
                    is_active: true,
                    starts_at: { [Op.lte]: currentDate },
                    [Op.or]: [
                        { ends_at: { [Op.gte]: currentDate } },
                        { ends_at: null }
                    ]
                }
            });
            const mostUsedDiscount = await models.Discount.findOne({
                order: [['used_count', 'DESC']],
                limit: 1,
            });
            const discountAmountResult = await sequelize.query(`SELECT SUM(discount_total) as total_discount FROM orders WHERE discount_id IS NOT NULL`, {
                type: QueryTypes.SELECT,
            });
            const totalDiscountAmount = discountAmountResult &&
                discountAmountResult[0] &&
                'total_discount' in discountAmountResult[0] &&
                discountAmountResult[0].total_discount !== null
                ? parseFloat(discountAmountResult[0].total_discount)
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
        }
        catch (error) {
            console.error('Error getting discount statistics:', error);
            return { success: false, error: error.message };
        }
    }
}
