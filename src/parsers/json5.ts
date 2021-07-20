import json5 from 'json5'
import { create } from './util'

/**
 * The JSON5 parser uses the `json5` NPM package to parse
 * `.json5` files.
 */
export default create(['json5'], json5.parse)
