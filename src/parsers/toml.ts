import toml from '@iarna/toml';
import { create } from './util';

/**
 * The TOML parser uses the `@iarna/toml` NPM package
 * to parse `.toml` files (that meet the TOML 1.0.0-rc.1
 * specification).
 */
export default create(['toml'], <T>(file: string) => toml.parse(file) as unknown as T);
