import toml from '@iarna/toml'
import { create } from './util'

export default create(['toml'], toml.parse)
