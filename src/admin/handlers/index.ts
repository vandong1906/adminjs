import { ProductHandler } from './product.handler.js';
import { ProductVariantHandler } from './product-variant.handler.js';
import { CollectionHandler } from './collection.handler.js';
import { OrderHandler } from './order.handler.js';
import { CustomerHandler } from './customer.handler.js';
import { DiscountHandler } from './discount.handler.js';
import { uploadProductVariantImages, getProductVariantImages, deleteProductVariantImage } from './product-variant-image-handler.js';
import { AttributeGroupHandler } from './attribute-group.handler.js';
export {
  ProductHandler,
  ProductVariantHandler,
  CollectionHandler,
  OrderHandler,
  CustomerHandler,
  DiscountHandler,
  AttributeGroupHandler,
  uploadProductVariantImages,
  getProductVariantImages,
  deleteProductVariantImage,
};

export default {
  ProductHandler,
  ProductVariantHandler,
  CollectionHandler,
  OrderHandler,
  CustomerHandler,
  DiscountHandler,
  AttributeGroupHandler,
  ProductVariantImageHandler: {
    uploadProductVariantImages,
    getProductVariantImages,
    deleteProductVariantImage,
  },
}; 