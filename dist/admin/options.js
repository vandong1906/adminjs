import componentLoader from './component-loader.js';
import { models } from '../db/models/association.js';
import { setupAttributeDataHandling } from './field-types/index.js';
setupAttributeDataHandling();
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
    'Currency'
];
const resources = Object.values(models)
    .filter(model => {
    return importantModels.includes(model.name);
})
    .map((model) => {
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
                actions: {
                    new: {
                        component: 'ProductForm',
                    },
                    edit: {
                        component: 'ProductForm',
                    },
                },
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
    if (model.name === 'ProductType') {
        return {
            resource: model,
            options: {
                actions: {
                    new: {
                        component: 'ProductTypeForm',
                    },
                    edit: {
                        component: 'ProductTypeForm',
                    },
                },
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
                actions: {
                    new: {
                        component: 'ProductVariantForm',
                    },
                    edit: {
                        component: 'ProductVariantForm',
                    },
                },
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
                actions: {
                    new: {
                        component: 'OrderForm',
                    },
                    edit: {
                        component: 'OrderForm',
                    },
                },
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
                actions: {
                    new: {
                        component: 'CustomerForm',
                    },
                    edit: {
                        component: 'CustomerForm',
                    },
                },
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
                actions: {
                    new: {
                        component: 'CartForm',
                    },
                    edit: {
                        component: 'CartForm',
                    },
                },
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
                actions: {
                    new: {
                        component: 'DiscountForm',
                    },
                    edit: {
                        component: 'DiscountForm',
                    },
                },
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
    return {
        resource: model,
        options: {
            properties: {},
        },
    };
});
const options = {
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
