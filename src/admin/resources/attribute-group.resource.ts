import { ResourceOptions } from 'adminjs';

export const attributeGroupResourceOptions: ResourceOptions = {
  navigation: {
    name: 'Catalog',
    icon: 'Catalog',
  },
  properties: {
    id: { isVisible: { list: true, filter: true, show: true, edit: false } },
    name: { 
      type: 'mixed',
      isVisible: { list: true, filter: true, show: true, edit: true },
    },
    handle: { isVisible: { list: true, filter: true, show: true, edit: true } },
    position: { isVisible: { list: true, filter: true, show: true, edit: true } },
    attributable_type: { isVisible: { list: true, filter: true, show: true, edit: true } },
    createdAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
    updatedAt: { isVisible: { list: true, filter: true, show: true, edit: false } },
  },
  actions: {
    new: {
      component: 'AttributeGroupForm',
    },
    edit: {
      component: 'AttributeGroupForm',
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
};