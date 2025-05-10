export abstract class BaseField {
  protected _value: any;

  constructor(value: any) {
    this._value = value;
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  toString(): string {
    return String(this._value);
  }

  toJSON(): any {
    return this._value;
  }
} 