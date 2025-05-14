import { ComponentLoader } from 'adminjs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentLoader = new ComponentLoader();

// Register all components using absolute paths with .js extension for compiled files
const componentsDir = join(__dirname, 'components');
componentLoader.add('jsonEditor', join(componentsDir, 'json-editor.js'));
componentLoader.add('AttributeActions', join(componentsDir, 'attribute-actions.js'));
componentLoader.add('ProductForm', join(componentsDir, 'product-form.js'));
componentLoader.add('ProductTypeForm', join(componentsDir, 'product-type-form.js'));
componentLoader.add('ProductVariantForm', join(componentsDir, 'product-variant-form.js'));
componentLoader.add('OrderForm', join(componentsDir, 'order-form.js'));
componentLoader.add('CustomerForm', join(componentsDir, 'customer-form.js'));
componentLoader.add('CartForm', join(componentsDir, 'cart-form.js'));
componentLoader.add('AttributeForm', join(componentsDir, 'attribute-form.js'));
componentLoader.add('AttributeGroupForm', join(componentsDir, 'attribute-group-form.js'));
componentLoader.add('AttributeEditor', join(componentsDir, 'attribute-editor.js'));
componentLoader.add('Dashboard', join(componentsDir, 'dashboard.js'));

export default componentLoader;
