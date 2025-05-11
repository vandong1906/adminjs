import { AdminJSOptions } from 'adminjs';
import componentLoader from './component-loader.js';
import { models } from '../db/models/association.js';
import { setupAttributeDataHandling } from './field-types/index.js';
import { AttributeGroupHandler } from './handlers/attribute-group.handler.js';
import { AttributeHandler } from './handlers/attribute.handler.js';

// Set up attribute data handling for Sequelize models
setupAttributeDataHandling();

// Các model quan trọng cần giữ lại
const importantModels = [
  'Product',
  'ProductType',
  'ProductVariant',
  'Order',
  'Customer',
  'Discount',
  'Cart',
  'User',
  'Channel',
  'Currency',
  'AttributeGroup',
  'Attribute'
];

// Configure resources with proper options
const resources = Object.values(models)
  .filter(model => {
    // Only include models that are defined as important
    return importantModels.includes(model.name);
  })
  .map((model) => {
    // Special configuration for Product model
    if (model.name === 'Product') {
      return {
        resource: model,
        options: {
          properties: {
            attribute_data: {
              type: 'mixed',
              components: {
                edit: 'AttributeEditor',
                show: 'AttributeEditor',
              },
            },
          },
          // Custom components for create and edit
          actions: {
            new: {
              component: 'ProductForm',
            },
            edit: {
              component: 'ProductForm',
            },
          },
          // Separate editing sections
          editProperties: [
            'product_type_id',
            'status',
            'brand_id',
            'attribute_data',
          ],
          showProperties: [
            'id',
            'product_type_id',
            'status',
            'brand_id',
            'attribute_data',
            'createdAt',
            'updatedAt',
          ],
        },
      };
    }

    // Special configuration for ProductType model
    if (model.name === 'ProductType') {
      return {
        resource: model,
        options: {
          // Custom components for create and edit
          actions: {
            new: {
              component: 'ProductTypeForm',
            },
            edit: {
              component: 'ProductTypeForm',
            },
          },
          // Separate editing sections
          editProperties: [
            'name',
          ],
          showProperties: [
            'id',
            'name',
            'createdAt',
            'updatedAt',
          ],
          listProperties: [
            'id',
            'name',
            'createdAt',
          ],
        },
      };
    }

    // Special configuration for ProductVariant model
    if (model.name === 'ProductVariant') {
      return {
        resource: model,
        options: {
          properties: {
            attribute_data: {
              type: 'mixed',
              isVisible: {
                list: false,
                filter: false,
                show: true,
                edit: true,
              },
            },
          },
          // Custom components for create and edit
          actions: {
            new: {
              component: 'ProductVariantForm',
            },
            edit: {
              component: 'ProductVariantForm',
            },
          },
          // Separate editing sections
          editProperties: [
            'product_id',
            'tax_class_id',
            'sku',
            'stock',
            'unit_quantity',
            'backorder',
            'purchasable',
            'attribute_data',
          ],
          showProperties: [
            'id',
            'product_id',
            'tax_class_id',
            'sku',
            'stock',
            'unit_quantity',
            'backorder',
            'purchasable',
            'attribute_data',
            'createdAt',
            'updatedAt',
          ],
          listProperties: [
            'id',
            'product_id',
            'sku',
            'stock',
            'purchasable',
            'createdAt',
          ],
        },
      };
    }

    // Special configuration for Order model
    if (model.name === 'Order') {
      return {
        resource: model,
        options: {
          properties: {
            meta: {
              type: 'mixed',
              isVisible: {
                list: false,
                filter: false,
                show: true,
                edit: true,
              },
            },
            tax_breakdown: {
              type: 'mixed',
              isVisible: {
                list: false,
                filter: false,
                show: true,
                edit: true,
              },
            },
          },
          // Custom components for create and edit
          actions: {
            new: {
              component: 'OrderForm',
            },
            edit: {
              component: 'OrderForm',
            },
          },
          // Separate editing sections
          editProperties: [
            'customer_id',
            'channel_id',
            'status',
            'reference',
            'customer_reference',
            'sub_total',
            'discount_total',
            'shipping_total',
            'tax_total',
            'notes',
            'currency_code',
            'compare_currency_code',
            'exchange_rate',
          ],
          showProperties: [
            'id',
            'customer_id',
            'channel_id',
            'status',
            'reference',
            'customer_reference',
            'sub_total',
            'discount_total',
            'shipping_total',
            'tax_breakdown',
            'tax_total',
            'total',
            'notes',
            'currency_code',
            'compare_currency_code',
            'exchange_rate',
            'placed_at',
            'meta',
            'createdAt',
            'updatedAt',
          ],
          listProperties: [
            'id',
            'status',
            'reference',
            'customer_id',
            'total',
            'currency_code',
            'placed_at',
            'createdAt',
          ],
        },
      };
    }

    // Special configuration for Customer model
    if (model.name === 'Customer') {
      return {
        resource: model,
        options: {
          properties: {
            meta: {
              type: 'mixed',
              isVisible: {
                list: false,
                filter: false,
                show: true,
                edit: true,
              },
            },
          },
          // Custom components for create and edit
          actions: {
            new: {
              component: 'CustomerForm',
            },
            edit: {
              component: 'CustomerForm',
            },
          },
          // Separate editing sections
          editProperties: [
            'title',
            'first_name',
            'last_name',
            'email',
            'phone',
            'company_name',
            'vat_no',
            'meta',
          ],
          showProperties: [
            'id',
            'title',
            'first_name',
            'last_name',
            'email',
            'phone',
            'company_name',
            'vat_no',
            'meta',
            'createdAt',
            'updatedAt',
          ],
          listProperties: [
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'createdAt',
          ],
        },
      };
    }

    // Special configuration for Cart model
    if (model.name === 'Cart') {
      return {
        resource: model,
        options: {
          properties: {
            meta: {
              type: 'mixed',
              isVisible: {
                list: false,
                filter: false,
                show: true,
                edit: true,
              },
            },
          },
          // Custom components for create and edit
          actions: {
            new: {
              component: 'CartForm',
            },
            edit: {
              component: 'CartForm',
            },
          },
          // Separate editing sections
          editProperties: [
            'user_id',
            'customer_id',
            'channel_id',
            'currency_id',
            'coupon_code',
            'completed_at',
          ],
          showProperties: [
            'id',
            'user_id',
            'customer_id',
            'merged_id',
            'channel_id',
            'currency_id',
            'coupon_code',
            'completed_at',
            'meta',
            'createdAt',
            'updatedAt',
          ],
          listProperties: [
            'id',
            'user_id',
            'customer_id',
            'channel_id',
            'currency_id',
            'completed_at',
            'createdAt',
          ],
        },
      };
    }

    // Special configuration for Discount model
    if (model.name === 'Discount') {
      return {
        resource: model,
        options: {
          properties: {
            value: {
              type: 'number',
            },
            min_order_value: {
              type: 'number',
            },
            max_uses: {
              type: 'number',
            },
            used_count: {
              isVisible: {
                list: true,
                filter: false,
                show: true,
                edit: false,
              },
            },
            starts_at: {
              type: 'datetime',
            },
            ends_at: {
              type: 'datetime',
            },
          },
          // Custom components for create and edit
          actions: {
            new: {
              component: 'DiscountForm',
            },
            edit: {
              component: 'DiscountForm',
            },
          },
          // Separate editing sections
          editProperties: [
            'name',
            'code',
            'type',
            'value',
            'min_order_value',
            'max_uses',
            'starts_at',
            'ends_at',
            'is_active',
          ],
          showProperties: [
            'id',
            'name',
            'code',
            'type',
            'value',
            'min_order_value',
            'max_uses',
            'used_count',
            'starts_at',
            'ends_at',
            'is_active',
            'createdAt',
            'updatedAt',
          ],
          listProperties: [
            'id',
            'name',
            'code',
            'type',
            'value',
            'used_count',
            'is_active',
            'starts_at',
            'ends_at',
          ],
        },
      };
    }
    if (model.name === 'AttributeGroup') {
      return {
        resource: model,
        options: {
          navigation: {
            name: 'Catalog',
            icon: 'Catalog',
          },
          properties: {
            name: {
              type: 'mixed',
              isVisible: { list: true, filter: true, show: true, edit: true },
              components: {
                show: 'JsonViewer',
                edit: 'JsonEditor',
              }
            },
            handle: {
              isVisible: { list: true, filter: true, show: true, edit: true },
              isRequired: true,
            },
            position: {
              isVisible: { list: true, filter: true, show: true, edit: true },
              isRequired: true,
            },
            attributable_type: {
              isVisible: { list: true, filter: true, show: true, edit: true },
              isRequired: true,
              availableValues: [
                { value: 'product', label: 'Product' },
                { value: 'collection', label: 'Collection' }
              ]
            },
          },
          // In your AttributeGroup resource configuration
          actions: {
            new: {
              // ...existing code...
              handler: async (request, response, context) => {
                const result = await AttributeGroupHandler.createAttributeGroup(request.payload);
                if (result.success) {
                  return {
                    record: context.record,
                    notice: {
                      message: 'Successfully created attribute group',
                      type: 'success',
                    },
                  };
                }
                throw new Error(result.error);
              },
            },
            edit: {
              // ...existing code...
              handler: async (request, response, context) => {
                const result = await AttributeGroupHandler.updateAttributeGroup(context.record.id, request.payload);
                if (result.success) {
                  return {
                    record: context.record,
                    notice: {
                      message: 'Successfully updated attribute group',
                      type: 'success',
                    },
                  };
                }
                throw new Error(result.error);
              },
            },
          },
          sort: {
            sortBy: 'position',
            direction: 'asc',
          },
          filterProperties: ['handle', 'attributable_type'],
          listProperties: ['id', 'name', 'handle', 'position', 'attributable_type'],
          editProperties: ['name', 'handle', 'position', 'attributable_type'],
          showProperties: ['id', 'name', 'handle', 'position', 'attributable_type', 'createdAt', 'updatedAt'],
        },
      };

    }
    if (model.name === 'Attribute') {
      return {
        resource: model,
        options: {
          navigation: {
            name: 'Catalog',
            icon: 'Catalog',
          },
          properties: {
            name: {
              type: 'mixed',
              isVisible: { list: true, filter: true, show: true, edit: true },
              components: {
                show: 'JsonViewer',
                edit: 'JsonEditor',
              }
            },
            description: {
              type: 'mixed',
              isVisible: { list: false, filter: false, show: true, edit: true },
              components: {
                show: 'JsonViewer',
                edit: 'JsonEditor',
              }
            },
            handle: {
              isVisible: { list: true, filter: true, show: true, edit: true },
              isRequired: true,
            },
            attribute_type: {
              isVisible: { list: true, filter: true, show: true, edit: true },
              isRequired: true,
            },
            type: {
              isVisible: { list: true, filter: true, show: true, edit: true },
              isRequired: true,
            },
            configuration: {
              type: 'mixed',
              isVisible: { list: false, filter: false, show: true, edit: true },
              components: {
                show: 'JsonViewer',
                edit: 'JsonEditor',
              }
            },
          },
          actions: {
            new: {
              component: 'AttributeForm',
              handler: async (request, response, context) => {
                const result = await AttributeHandler.createAttribute(request.payload);
                if (result.success) {
                  return {
                    record: result.data,
                    notice: {
                      message: 'Successfully created attribute',
                      type: 'success',
                    },
                  };
                }
                throw new Error(result.error);
              },
            }, edit: {
              component: 'AttributeForm',
              handler: async (request, response, context) => {
                const result = await AttributeHandler.updateAttribute(
                  context.record.id,
                  request.payload
                );
                if (result.success) {
                  return {
                    record: result.data,
                    notice: {
                      message: 'Successfully updated attribute',
                      type: 'success',
                    },
                  };
                }
                throw new Error(result.error);
              },
            },
            delete: {
              handler: async (request, response, context) => {
                const result = await AttributeHandler.deleteAttribute(context.record.id);
                if (result.success) {
                  return {
                    record: context.record,
                    notice: {
                      message: 'Successfully deleted attribute',
                      type: 'success',
                    },
                  };
                }
                throw new Error(result.error);
              },
            },
          },
          sort: {
            sortBy: 'position',
            direction: 'asc',
          },
          filterProperties: ['handle', 'attribute_type', 'type', 'required'],
          listProperties: ['id', 'name', 'handle', 'attribute_type', 'type', 'required', 'position'],
          editProperties: ['name', 'description', 'handle', 'attribute_type', 'type', 'position', 'section', 'required', 'default_value', 'configuration', 'system', 'filterable', 'searchable'],
          showProperties: ['id', 'name', 'description', 'handle', 'attribute_type', 'type', 'position', 'section', 'required', 'default_value', 'configuration', 'system', 'filterable', 'searchable', 'createdAt', 'updatedAt'],
        },
      };
    }
    // Default configuration for other models
    return {
      resource: model,
      options: {
        // Default configuration
        properties: {},
      },
    };
  });

const options: AdminJSOptions = {
  rootPath: '/admin',
  loginPath: '/admin/login',
  logoutPath: '/admin/logout',
  dashboard: {
    component: 'Dashboard',
  },
  resources,
  branding: {
    companyName: 'Lunar E-commerce',
    logo: false,
  },
  locale: {
    language: 'en',
    translations: {
      labels: {
        navigation: 'Navigation',
      },
      resources: {},
      messages: {
        successfullyCreated: 'Successfully created a new record',
        successfullyUpdated: 'Successfully updated a record',
        successfullyDeleted: 'Successfully deleted a record',
      },
    },
  },
  componentLoader,
};

export default options;
