import { parse } from 'yaml'

export default {
  extensions() {
    return ['yaml', 'yml']
  },
  parse(file: string): Record<string, any> {
    return parse(file)
  },
}
