import { parse } from 'yaml'

export default {
  extensions() {
    return ['yaml', 'yml']
  },
  parse(file: string) {
    return parse(file)
  },
}
