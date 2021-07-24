import ini from 'ini';
import { create } from './util';

/**
 * The INI parser uses the `ini` NPM package to parse
 * `.ini` files.
 */
export default create(['ini'], <T>(file: string) => ini.parse(file) as T);
