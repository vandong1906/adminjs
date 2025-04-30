import { AdminJSOptions } from 'adminjs';

import componentLoader from './component-loader.js';
import { Category } from '../db/models/category.entity.js';
import Product from '../db/models/products.entity.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [Category,Product],
  databases: [],
};

export default options;
