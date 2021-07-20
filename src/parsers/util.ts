import { Parser } from '.'

export function create(extenstions: string[], parse: (file: string) => Record<string, any>): Parser {
  return {
    extensions() {
      return extenstions
    },
    parse,
  }
}
