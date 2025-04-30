import { owningRelationSettingsFeature, RelationType } from '@adminjs/relations'
import  componentLoader  from '../component-loader.js';


import ProductVariant from 'src/db/models/productVariants.entity.js';
import Product from 'src/db/models/products.entity.js';

export const createProductVariantResource = () => ({
  resource: ProductVariant,
  features: [
    owningRelationSettingsFeature({
      componentLoader,
      licenseKey: process.env.LICENSE_KEY,
      relations: {
        product: {
          type: RelationType.OneToMany, // Define the relationship type
          target: {
            joinKey: 'product_id', // Foreign key in ProductVariant
            resourceId: 'Product', // AdminJS resource ID for Product
          },
        },
      },
    }),
  ],
});