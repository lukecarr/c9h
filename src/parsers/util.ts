import { Parser } from '.'

/**
 * This utility function creates a new `Parser` interface.
 * 
 * @param extenstions The file extensions that this parser supports.
 * @param parse The parsing function for this parser, which accepts
 * a file contents string.
 * @returns The created parser interface implementation.
 */
export function create(extenstions: string[], parse: (file: string) => Record<string, any>): Parser {
  return {
    extensions() {
      return extenstions
    },
    parse,
  }
}
