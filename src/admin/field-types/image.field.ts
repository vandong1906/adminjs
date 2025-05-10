import { BaseField } from './base.field.js';

export type ImageConfiguration = {
  thumbnailSize: {
    width: number;
    height: number;
  };
  allowedExtensions: string[];
  maxSize: number; // in bytes
};

export type ImageValue = {
  id?: number;
  url: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  size?: number;
  mimeType?: string;
};

export class ImageField extends BaseField {
  private _configuration: ImageConfiguration;

  constructor(value: ImageValue | ImageValue[], configuration: Partial<ImageConfiguration> = {}) {
    super(value);
    this._configuration = {
      thumbnailSize: configuration.thumbnailSize || { width: 200, height: 200 },
      allowedExtensions: configuration.allowedExtensions || ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      maxSize: configuration.maxSize || 5 * 1024 * 1024, // 5MB default
    };
  }

  get configuration(): ImageConfiguration {
    return this._configuration;
  }
} 