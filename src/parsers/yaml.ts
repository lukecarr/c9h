import yaml from 'js-yaml';
import { create } from './util';

/**
 * The YAML parser uses the `yaml` NPM package to parse
 * `.yaml` and `.yml` files.
 */
export default create(['yaml', 'yml'], <T>(file: string) => yaml.load(file) as unknown as T);
