import { create } from './util';

/**
 * The JSON parser uses the built-in `JSON.parse`
 * function to parse `.json` files.
 */
export default create(['json'], JSON.parse);
