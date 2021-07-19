import { parse } from 'json5'

export default {
  extensions() {
    return ['json5']
  },
  parse(file: string): Record<string, any> {
    return parse(file)
  },
}
