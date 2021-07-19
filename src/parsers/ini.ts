import { parse } from 'ini'

export default {
  extensions() {
    return ['ini']
  },
  parse(file: string): Record<string, any> {
    return parse(file)
  },
}
