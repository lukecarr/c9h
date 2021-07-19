import { parse } from 'ini'

export default {
  extensions() {
    return ['ini']
  },
  parse(file: string) {
    return parse(file)
  },
}
