import { ComponentLoader } from 'adminjs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentLoader = new ComponentLoader();

// Register components with absolute paths - using .tsx extension for TypeScript files
const componentsDir = join(__dirname, 'components');
componentLoader.add('AttributeEditor', join(componentsDir, 'attribute-editor.tsx'));
componentLoader.add('Dashboard', join(componentsDir, 'dashboard.tsx'));
componentLoader.add('ProductForm', join(componentsDir, 'product-form.tsx'));
componentLoader.add('ProductVariantForm', join(componentsDir, 'product-variant-form.tsx'));
componentLoader.add('CollectionForm', join(componentsDir, 'collection-form.tsx'));
componentLoader.add('CustomerForm', join(componentsDir, 'customer-form.tsx'));
componentLoader.add('CustomerStatistics', join(componentsDir, 'customer-statistics.tsx'));
componentLoader.add('DiscountForm', join(componentsDir, 'discount-form.tsx'));
componentLoader.add('DiscountStatistics', join(componentsDir, 'discount-statistics.tsx'));
componentLoader.add('OrderForm', join(componentsDir, 'order-form.tsx'));
componentLoader.add('BrandForm', join(componentsDir, 'brand-form.tsx'));
componentLoader.add('CustomerGroupForm', join(componentsDir, 'customer-group-form.tsx'));
componentLoader.add('CartForm', join(componentsDir, 'cart-form.tsx'));
componentLoader.add('TaxRateForm', join(componentsDir, 'tax-rate-form.tsx'));
componentLoader.add('ProductTypeForm', join(componentsDir, 'product-type-form.tsx'));
componentLoader.add('TaxClassForm', join(componentsDir, 'tax-class-form.tsx'));
componentLoader.add('TaxZoneForm', join(componentsDir, 'tax-zone-form.tsx'));

export default componentLoader; 