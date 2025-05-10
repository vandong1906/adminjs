import { BaseField } from './base.field.js';

export class ListField extends BaseField {
  constructor(value: string[]) {
    super(value);
  }

  addItem(item: string): void {
    const items = this._value as string[];
    items.push(item);
  }

  removeItem(index: number): void {
    const items = this._value as string[];
    if (index >= 0 && index < items.length) {
      items.splice(index, 1);
    }
  }

  moveItem(fromIndex: number, toIndex: number): void {
    const items = this._value as string[];
    if (
      fromIndex >= 0 && 
      fromIndex < items.length && 
      toIndex >= 0 && 
      toIndex < items.length
    ) {
      const item = items[fromIndex];
      items.splice(fromIndex, 1);
      items.splice(toIndex, 0, item);
    }
  }
} 