import { parse } from '@iarna/toml'

export default {
  extensions() {
    return ['toml']
  },
  parse(file: string) {
    return parse(file)
  },
}
