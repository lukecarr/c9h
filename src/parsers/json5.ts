import { parse } from 'json5'

export default {
  extensions() {
    return ['json5']
  },
  parse(file: string) {
    return parse(file)
  },
}
