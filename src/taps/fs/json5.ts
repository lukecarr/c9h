import json5 from 'json5';
import { FilesystemOptions, FilesystemTap } from './base';

export class Json5Tap extends FilesystemTap {
  constructor(options?: FilesystemOptions) {
    super(options, ['json5']);
  }

  parseContents<T>(contents: string): Partial<T> {
    return json5.parse(contents);
  }
}
