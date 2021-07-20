import yaml from 'yaml'
import { create } from './util'

export default create(['yaml', 'yml'], yaml.parse)
