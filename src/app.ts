import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import dotenv from "dotenv";
dotenv.config();
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import { models } from './db/models/association.js';
import { 
  ProductHandler, 
  ProductVariantHandler,
  CollectionHandler, 
  OrderHandler, 
  CustomerHandler, 
  DiscountHandler,
  uploadProductVariantImages,
  getProductVariantImages,
  deleteProductVariantImage,
  AttributeGroupHandler
} from './admin/handlers/index.js';

const port = process.env.PORT || 3000;

const start = async () => {
  const app = express();
  await initializeDb();

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  // Add API routes before admin router
  app.use(express.json());
  
  // Dashboard data endpoint for AdminJS
  app.get('/admin/api/dashboard', async (req, res) => {
    try {
      // Calculate dashboard metrics
      const productsCount = await models.Product.count() || 0;
      const ordersCount = await models.Order.count() || 0;
      const customersCount = await models.Customer.count() || 0;
      
      // Calculate total revenue
      const orders = await models.Order.findAll({
        where: {
          status: 'completed'
        },
      });
      
      const revenue = orders.reduce((sum, order) => {
        const orderTotal = typeof order.total === 'string' 
          ? parseFloat(order.total) 
          : (order.total || 0);
        return sum + orderTotal;
      }, 0);
      
      res.json({
        products: productsCount,
        orders: ordersCount,
        customers: customersCount,
        revenue: revenue,
      });
    } catch (error) {
      console.error('Error getting dashboard data:', error);
      res.status(500).json({ 
        products: 0,
        orders: 0,
        customers: 0,
        revenue: 0,
        error: 'Failed to retrieve dashboard data' 
      });
    }
  });
  
  // API route to get attributes
  app.get('/api/attributes', async (req, res) => {
    try {
      const attributeType = req.query.attribute_type as string;
      const query = attributeType ? { 
        where: { 
          attribute_type: attributeType 
        } 
      } : {};
      
      const attributes = await models.Attribute.findAll(query);
      res.json(attributes);
    } catch (error) {
      console.error('Error fetching attributes:', error);
      res.status(500).json({ error: 'Failed to fetch attributes' });
    }
  });

  // Product API endpoints
  app.get('/admin/api/products/:id', async (req, res) => {
    const result = await ProductHandler.getProduct(req.params.id);
    if (result.success) {
      res.json(result.product);
    } else {
      res.status(404).json({ error: result.error });
    }
  });

  app.get('/admin/api/product-attributes', async (req, res) => {
    const productTypeId = req.query.product_type_id as string;
    const result = await ProductHandler.getProductAttributes(productTypeId);
    if (result.success) {
      res.json(result.attributes);
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  app.post('/admin/api/products', async (req, res) => {
    const result = await ProductHandler.createProduct(req.body);
    if (result.success) {
      res.status(201).json(result.product);
    } else {
      res.status(400).json({ error: result.error });
    }
  });

  app.put('/admin/api/products/:id', async (req, res) => {
    const result = await ProductHandler.updateProduct(req.params.id, req.body);
    if (result.success) {
      res.json(result.product);
    } else {
      res.status(result.error === 'Product not found' ? 404 : 400).json({ error: result.error });
    }
  });

  app.delete('/admin/api/products/:id', async (req, res) => {
    const result = await ProductHandler.deleteProduct(req.params.id);
    if (result.success) {
      res.status(204).send();
    } else {
      res.status(result.error === 'Product not found' ? 404 : 500).json({ error: result.error });
    }
  });

  // Collection API endpoints
  app.get('/admin/api/collections/:id', async (req, res) => {
    const result = await CollectionHandler.getCollection(req.params.id);
    if (result.success) {
      res.json(result.collection);
    } else {
      res.status(404).json({ error: result.error });
    }
  });

  app.get('/admin/api/collection-attributes', async (req, res) => {
    const result = await CollectionHandler.getCollectionAttributes();
    if (result.success) {
      res.json(result.attributes);
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  app.get('/admin/api/collection-groups', async (req, res) => {
    const result = await CollectionHandler.getCollectionGroups();
    if (result.success) {
      res.json(result.groups);
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  app.post('/admin/api/collections', async (req, res) => {
    const result = await CollectionHandler.createCollection(req.body);
    if (result.success) {
      res.status(201).json(result.collection);
    } else {
      res.status(400).json({ error: result.error });
    }
  });

  app.put('/admin/api/collections/:id', async (req, res) => {
    const result = await CollectionHandler.updateCollection(req.params.id, req.body);
    if (result.success) {
      res.json(result.collection);
    } else {
      res.status(result.error === 'Collection not found' ? 404 : 400).json({ error: result.error });
    }
  });

  app.delete('/admin/api/collections/:id', async (req, res) => {
    const result = await CollectionHandler.deleteCollection(req.params.id);
    if (result.success) {
      res.status(204).send();
    } else {
      const statusCode = result.error.includes('not found') ? 404 : 
                         result.error.includes('children') ? 409 : 500;
      res.status(statusCode).json({ error: result.error });
    }
  });

  // Order API endpoints
  app.get('/admin/api/orders', async (req, res) => {
    const params = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      status: req.query.status as string,
      customer_id: req.query.customer_id ? parseInt(req.query.customer_id as string) : undefined,
      reference: req.query.reference as string,
      fromDate: req.query.fromDate as string,
      toDate: req.query.toDate as string,
      sort: req.query.sort as string,
      order: req.query.order as 'ASC' | 'DESC',
    };
    
    const result = await OrderHandler.getOrders(params);
    if (result.success) {
      res.json({
        orders: result.orders,
        pagination: result.pagination,
      });
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  app.get('/admin/api/orders/:id', async (req, res) => {
    const result = await OrderHandler.getOrder(req.params.id);
    if (result.success) {
      res.json(result.order);
    } else {
      res.status(404).json({ error: result.error });
    }
  });

  app.put('/admin/api/orders/:id/status', async (req, res) => {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    const result = await OrderHandler.updateOrderStatus(req.params.id, status);
    if (result.success) {
      res.json(result.order);
    } else {
      res.status(result.error === 'Order not found' ? 404 : 400).json({ error: result.error });
    }
  });

  app.post('/admin/api/orders/:id/cancel', async (req, res) => {
    const { reason } = req.body;
    const result = await OrderHandler.cancelOrder(req.params.id, reason);
    if (result.success) {
      res.json(result.order);
    } else {
      const statusCode = result.error.includes('not found') ? 404 : 400;
      res.status(statusCode).json({ error: result.error });
    }
  });

  app.post('/admin/api/orders/:id/notes', async (req, res) => {
    const { note } = req.body;
    if (!note) {
      return res.status(400).json({ error: 'Note is required' });
    }
    
    const result = await OrderHandler.addOrderNote(req.params.id, note);
    if (result.success) {
      res.json(result.order);
    } else {
      res.status(result.error === 'Order not found' ? 404 : 400).json({ error: result.error });
    }
  });

  app.get('/admin/api/order-statistics', async (req, res) => {
    const params = {
      fromDate: req.query.fromDate as string,
      toDate: req.query.toDate as string,
    };
    
    const result = await OrderHandler.getOrderStatistics(params);
    if (result.success) {
      res.json(result.statistics);
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  app.get('/admin/api/generate-order-reference', async (req, res) => {
    try {
      const reference = await OrderHandler.generateOrderReference();
      res.json({ reference });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate order reference' });
    }
  });

  // Customer API endpoints
  app.get('/admin/api/customers', async (req, res) => {
    const params = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      name: req.query.name as string,
      email: req.query.email as string,
      group_id: req.query.group_id ? parseInt(req.query.group_id as string) : undefined,
      fromDate: req.query.fromDate as string,
      toDate: req.query.toDate as string,
      sort: req.query.sort as string,
      order: req.query.order as 'ASC' | 'DESC',
    };
    
    const result = await CustomerHandler.getCustomers(params);
    if (result.success) {
      res.json({
        customers: result.customers,
        pagination: result.pagination,
      });
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  app.get('/admin/api/customers/:id', async (req, res) => {
    const result = await CustomerHandler.getCustomer(req.params.id);
    if (result.success) {
      res.json(result.customer);
    } else {
      res.status(404).json({ error: result.error });
    }
  });

  app.post('/admin/api/customers', async (req, res) => {
    const result = await CustomerHandler.createCustomer(req.body);
    if (result.success) {
      res.status(201).json(result.customer);
    } else {
      res.status(400).json({ error: result.error });
    }
  });

  app.put('/admin/api/customers/:id', async (req, res) => {
    const result = await CustomerHandler.updateCustomer(req.params.id, req.body);
    if (result.success) {
      res.json(result.customer);
    } else {
      res.status(result.error === 'Customer not found' ? 404 : 400).json({ error: result.error });
    }
  });

  app.delete('/admin/api/customers/:id', async (req, res) => {
    const result = await CustomerHandler.deleteCustomer(req.params.id);
    if (result.success) {
      res.status(204).send();
    } else {
      const statusCode = result.error.includes('not found') ? 404 : 
                         result.error.includes('orders') ? 409 : 500;
      res.status(statusCode).json({ error: result.error });
    }
  });

  app.post('/admin/api/customers/:id/anonymize', async (req, res) => {
    const result = await CustomerHandler.anonymizeCustomer(req.params.id);
    if (result.success) {
      res.json(result.customer);
    } else {
      res.status(result.error === 'Customer not found' ? 404 : 400).json({ error: result.error });
    }
  });

  app.get('/admin/api/customer-groups', async (req, res) => {
    const result = await CustomerHandler.getCustomerGroups();
    if (result.success) {
      res.json(result.groups);
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  app.get('/admin/api/customer-statistics', async (req, res) => {
    const result = await CustomerHandler.getCustomerStatistics();
    if (result.success) {
      res.json(result.statistics);
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  // Discount API endpoints
  app.get('/admin/api/discounts', async (req, res) => {
    const params = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      code: req.query.code as string,
      type: req.query.type as string,
      isActive: req.query.isActive === 'true',
      fromDate: req.query.fromDate as string,
      toDate: req.query.toDate as string,
      sort: req.query.sort as string,
      order: req.query.order as 'ASC' | 'DESC',
    };
    
    const result = await DiscountHandler.getDiscounts(params);
    if (result.success) {
      res.json({
        discounts: result.discounts,
        pagination: result.pagination,
      });
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  app.get('/admin/api/discounts/:id', async (req, res) => {
    const result = await DiscountHandler.getDiscount(req.params.id);
    if (result.success) {
      res.json(result.discount);
    } else {
      res.status(404).json({ error: result.error });
    }
  });

  app.post('/admin/api/discounts', async (req, res) => {
    const result = await DiscountHandler.createDiscount(req.body);
    if (result.success) {
      res.status(201).json(result.discount);
    } else {
      res.status(400).json({ error: result.error });
    }
  });

  app.put('/admin/api/discounts/:id', async (req, res) => {
    const result = await DiscountHandler.updateDiscount(req.params.id, req.body);
    if (result.success) {
      res.json(result.discount);
    } else {
      res.status(result.error === 'Discount not found' ? 404 : 400).json({ error: result.error });
    }
  });

  app.delete('/admin/api/discounts/:id', async (req, res) => {
    const result = await DiscountHandler.deleteDiscount(req.params.id);
    if (result.success) {
      res.status(204).send();
    } else {
      const statusCode = result.error.includes('not found') ? 404 : 
                         result.error.includes('orders') ? 409 : 500;
      res.status(statusCode).json({ error: result.error });
    }
  });

  app.post('/admin/api/discounts/validate', async (req, res) => {
    const { code, customer_id, cart_total } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Discount code is required' });
    }
    
    const result = await DiscountHandler.validateDiscount(
      code, 
      customer_id ? parseInt(customer_id) : undefined,
      cart_total ? parseFloat(cart_total) : undefined
    );
    
    if (result.success) {
      res.json(result.discount);
    } else {
      res.status(400).json({ error: result.error });
    }
  });

  app.get('/admin/api/discount-statistics', async (req, res) => {
    const result = await DiscountHandler.getDiscountStatistics();
    if (result.success) {
      res.json(result.statistics);
    } else {
      res.status(500).json({ error: result.error });
    }
  });

  // Product Variant API endpoints
  app.get('/admin/api/product-variants/:id', async (req, res) => {
    const result = await ProductVariantHandler.getProductVariant(req.params.id);
    if (result.success) {
      res.json(result.variant);
    } else {
      res.status(404).json({ error: result.error });
    }
  });

  app.post('/admin/api/product-variants', async (req, res) => {
    const result = await ProductVariantHandler.createProductVariant(req.body);
    if (result.success) {
      res.status(201).json(result.variant);
    } else {
      res.status(400).json({ error: result.error });
    }
  });

  app.put('/admin/api/product-variants/:id', async (req, res) => {
    const result = await ProductVariantHandler.updateProductVariant(req.params.id, req.body);
    if (result.success) {
      res.json(result.variant);
    } else {
      res.status(result.error === 'Product variant not found' ? 404 : 400).json({ error: result.error });
    }
  });

  app.delete('/admin/api/product-variants/:id', async (req, res) => {
    const result = await ProductVariantHandler.deleteProductVariant(req.params.id);
    if (result.success) {
      res.status(204).send();
    } else {
      res.status(result.error === 'Product variant not found' ? 404 : 500).json({ error: result.error });
    }
  });

  // Product Variant Image API endpoints
  app.post('/admin/api/product-variants/:id/images', uploadProductVariantImages);
  app.get('/admin/api/product-variants/:id/images', getProductVariantImages);
  app.delete('/admin/api/media/:id', deleteProductVariantImage);

  // Mock endpoints for missing resources to prevent runtime errors
  app.get('/admin/api/mock-resources/:resourceType', (req, res) => {
    const { resourceType } = req.params;
    // Return empty array to prevent errors
    res.json({ records: [] });
  });
  
  // Add specific mock endpoints for commonly accessed missing resources
  ['TaxClass', 'Brand', 'Channel', 'Currency'].forEach(resource => {
    app.get(`/admin/api/resources/${resource}`, (req, res) => {
      res.json({ 
        records: [], 
        meta: { 
          total: 0, 
          perPage: 10, 
          page: 1, 
          direction: 'asc' 
        } 
      });
    });
    
    // Mock the list action for AdminJS API client
    app.get(`/admin/api/resources/${resource}/actions/list`, (req, res) => {
      res.json({ 
        data: { 
          records: [],
          meta: { 
            total: 0, 
            perPage: 10, 
            page: 1, 
            direction: 'asc' 
          }
        },
        meta: {
          total: 0,
          perPage: 10,
          page: 1,
          direction: 'asc'
        }
      });
    });
  });

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    },
  );
router.get('/attribute-groups', async (req, res) => {
  const result = await AttributeGroupHandler.getAttributeGroups();
  res.json(result);
});

router.post('/attribute-groups', async (req, res) => {
  const result = await AttributeGroupHandler.createAttributeGroup(req.body);
  res.json(result);
});

  app.use(admin.options.rootPath, router);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
