import { BaseField } from './base.field.js';
export class ListField extends BaseField {
    constructor(value) {
        super(value);
    }
    addItem(item) {
        const items = this._value;
        items.push(item);
    }
    removeItem(index) {
        const items = this._value;
        if (index >= 0 && index < items.length) {
            items.splice(index, 1);
        }
    }
    moveItem(fromIndex, toIndex) {
        const items = this._value;
        if (fromIndex >= 0 &&
            fromIndex < items.length &&
            toIndex >= 0 &&
            toIndex < items.length) {
            const item = items[fromIndex];
            items.splice(fromIndex, 1);
            items.splice(toIndex, 0, item);
        }
    }
}
