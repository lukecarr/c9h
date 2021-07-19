import { parse } from '@iarna/toml'

export default {
  extensions() {
    return ['toml']
  },
  parse(file: string): Record<string, any> {
    return parse(file)
  },
}
