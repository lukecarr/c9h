import { ParserType } from './parsers'

export type Options<T> = {
  name?: string,
  defaults?: Partial<T>,
  parsers?: ParserType[],
  paths?: ((name: string) => string)[],
  mergeArray?: boolean,
}
