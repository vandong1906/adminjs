import componentLoader from './component-loader.js';
import { Category } from '../db/models/category.entity.js';
const options = {
    componentLoader,
    rootPath: '/admin',
    resources: [Category],
    databases: [],
};
export default options;
