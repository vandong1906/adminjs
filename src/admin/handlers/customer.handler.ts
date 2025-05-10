import { models } from '../../db/models/association.js';
import { Op, QueryTypes } from 'sequelize';
import sequelize from '../../db/config.js';

// Define interfaces for parameters
interface CustomerFilterParams {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
  group_id?: number;
  fromDate?: string;
  toDate?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

/**
 * Handler for customer-related operations in the admin panel
 */
export class CustomerHandler {
  /**
   * Get a customer by ID with all related data
   */
  static async getCustomer(id: number | string) {
    try {
      // Get customer with all related data
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
    } catch (error: any) {
      console.error('Error getting customer:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get customers with pagination and filters
   */
  static async getCustomers(params: CustomerFilterParams = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        name,
        email,
        group_id,
        fromDate,
        toDate,
        sort = 'createdAt',
        order = 'DESC',
      } = params;

      const offset = (page - 1) * limit;
      
      // Build where clause based on filters
      const where: any = {};
      
      if (name) {
        where[Op.or] = [
          { first_name: { [Op.like]: `%${name}%` } },
          { last_name: { [Op.like]: `%${name}%` } },
        ];
      }
      
      if (email) {
        where.email = { [Op.like]: `%${email}%` };
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

      const include: any[] = [
        { model: models.CustomerGroup, as: 'customerGroups' },
      ];

      // Filter by customer group if provided
      if (group_id) {
        include[0].where = { id: group_id };
      }

      // Get customers with pagination
      const { count, rows } = await models.Customer.findAndCountAll({
        where,
        include,
        order: [[sort, order]],
        limit,
        offset,
        distinct: true, // Required for correct count when using includes
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
    } catch (error: any) {
      console.error('Error getting customers:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a new customer
   */
  static async createCustomer(data: any) {
    try {
      // Create the customer with only supported fields
      const customer = await models.Customer.create({
        title: data.title,
        first_name: data.first_name,
        last_name: data.last_name,
        // email: data.email,  // Remove if not in model
        // phone: data.phone,  // Remove if not in model
        // company_name: data.company_name,  // Remove if not in model
        // vat_no: data.vat_no,  // Remove if not in model
        meta: data.meta || {},
      });

      // Associate customer groups if provided
      if (data.group_ids && Array.isArray(data.group_ids) && data.group_ids.length > 0) {
        for (const groupId of data.group_ids) {
          // Use models.sequelize.models if junction model not directly accessible
          await sequelize.query(
            'INSERT INTO customer_customer_groups (customer_id, customer_group_id) VALUES (?, ?)',
            {
              replacements: [customer.id, groupId],
              type: QueryTypes.INSERT,
            }
          );
        }
      }

      return {
        success: true,
        customer,
      };
    } catch (error: any) {
      console.error('Error creating customer:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Update a customer
   */
  static async updateCustomer(id: number | string, data: any) {
    try {
      const customer = await models.Customer.findByPk(id);

      if (!customer) {
        return { success: false, error: 'Customer not found' };
      }

      // Update customer data with only supported fields
      await customer.update({
        title: data.title,
        first_name: data.first_name,
        last_name: data.last_name,
        // email: data.email,  // Remove if not in model
        // phone: data.phone,  // Remove if not in model
        // company_name: data.company_name,  // Remove if not in model
        // vat_no: data.vat_no,  // Remove if not in model
        meta: data.meta || {},
      });

      // Update customer groups if provided
      if (data.group_ids && Array.isArray(data.group_ids)) {
        // Remove existing associations using direct SQL
        await sequelize.query(
          'DELETE FROM customer_customer_groups WHERE customer_id = ?',
          {
            replacements: [id],
            type: QueryTypes.DELETE,
          }
        );

        // Create new associations
        if (data.group_ids.length > 0) {
          for (const groupId of data.group_ids) {
            await sequelize.query(
              'INSERT INTO customer_customer_groups (customer_id, customer_group_id) VALUES (?, ?)',
              {
                replacements: [customer.id, groupId],
                type: QueryTypes.INSERT,
              }
            );
          }
        }
      }

      return {
        success: true,
        customer,
      };
    } catch (error: any) {
      console.error('Error updating customer:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Delete a customer
   */
  static async deleteCustomer(id: number | string) {
    try {
      const customer = await models.Customer.findByPk(id);
      
      if (!customer) {
        return { success: false, error: 'Customer not found' };
      }

      // Check if customer has orders using direct SQL
      const [orderResults] = await sequelize.query(
        'SELECT COUNT(*) as count FROM orders WHERE customer_id = ?',
        {
          replacements: [id],
          type: QueryTypes.SELECT,
        }
      );

      // @ts-ignore
      if (orderResults && orderResults.count > 0) {
        return { 
          success: false, 
          error: 'Cannot delete customer with existing orders. Consider anonymizing the customer instead.' 
        };
      }

      // Delete related data using direct SQL
      await sequelize.query(
        'DELETE FROM customer_customer_groups WHERE customer_id = ?',
        {
          replacements: [id],
          type: QueryTypes.DELETE,
        }
      );
      
      await models.Address.destroy({ where: { customer_id: id } });

      // Delete the customer
      await customer.destroy();

      return {
        success: true,
      };
    } catch (error: any) {
      console.error('Error deleting customer:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Anonymize a customer (for GDPR compliance)
   */
  static async anonymizeCustomer(id: number | string) {
    try {
      const customer = await models.Customer.findByPk(id);

      if (!customer) {
        return { success: false, error: 'Customer not found' };
      }

      // Generate anonymous data
      const anonymousEmail = `anonymous-${Date.now()}@example.com`;
      
      // Update with anonymous data, only including supported fields
      await customer.update({
        first_name: 'Anonymous',
        last_name: 'User',
        // email: anonymousEmail,  // Remove if not in model
        // phone: null,  // Remove if not in model
        // company_name: null,  // Remove if not in model
        // vat_no: null,  // Remove if not in model
        meta: { anonymized: true, anonymized_at: new Date().toISOString() },
      });

      // Remove from customer groups using direct SQL
      await sequelize.query(
        'DELETE FROM customer_customer_groups WHERE customer_id = ?',
        {
          replacements: [id],
          type: QueryTypes.DELETE,
        }
      );

      // Delete addresses
      await models.Address.destroy({ where: { customer_id: id } });

      return {
        success: true,
        customer,
      };
    } catch (error: any) {
      console.error('Error anonymizing customer:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get customer groups
   */
  static async getCustomerGroups() {
    try {
      const groups = await models.CustomerGroup.findAll({
        order: [['name', 'ASC']],
      });

      return {
        success: true,
        groups,
      };
    } catch (error: any) {
      console.error('Error getting customer groups:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get customer statistics
   */
  static async getCustomerStatistics() {
    try {
      // Total customers
      const totalCustomers = await models.Customer.count();

      // New customers in the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const newCustomers = await models.Customer.count({
        where: {
          createdAt: { [Op.gte]: thirtyDaysAgo }
        }
      });

      // Customer with most orders - using direct SQL query
      const [topCustomers] = await sequelize.query(
        `SELECT 
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
        LIMIT 1`,
        {
          type: QueryTypes.SELECT,
        }
      );

      // Using any because we're using raw SQL
      const topCustomer = topCustomers ? {
        id: (topCustomers as any).customer_id,
        name: `${(topCustomers as any).first_name} ${(topCustomers as any).last_name}`,
        orderCount: parseInt((topCustomers as any).order_count),
      } : null;

      // Customers by group using direct SQL
      const customersByGroupRaw = await sequelize.query(
        `SELECT 
          cg.id,
          cg.name,
          COUNT(ccg.customer_id) as customer_count
        FROM 
          customer_groups cg
        LEFT JOIN 
          customer_customer_groups ccg ON cg.id = ccg.customer_group_id
        GROUP BY 
          cg.id, cg.name`,
        {
          type: QueryTypes.SELECT,
        }
      );

      // Format customer groups
      const customersByGroup = Array.isArray(customersByGroupRaw) && customersByGroupRaw[0]
        ? (customersByGroupRaw[0] as any[]).map((g: any) => ({
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
    } catch (error: any) {
      console.error('Error getting customer statistics:', error);
      return { success: false, error: error.message };
    }
  }
} 