export class BaseField {
    _value;
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    toString() {
        return String(this._value);
    }
    toJSON() {
        return this._value;
    }
}
