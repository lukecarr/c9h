import yaml from 'yaml'
import { create } from './util'

/**
 * The YAML parser uses the `yaml` NPM package to parse
 * `.yaml` and `.yml` files.
 */
export default create(['yaml', 'yml'], yaml.parse)
