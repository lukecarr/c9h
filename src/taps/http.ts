import { $fetch, FetchOptions, FetchRequest } from 'ohmyfetch';
import { Callable, ifCallable } from '../util';
import { Parser, Tap } from './base';

export type HttpOptions = {
  request: FetchRequest;

  options?: FetchOptions<'json'>;
};

export class HttpTap extends Tap<Callable<HttpOptions>> implements Parser {
  async parse<T>(): Promise<Partial<T>> {
    return await $fetch<Partial<T>>(ifCallable(this.options?.request), ifCallable(this.options?.options));
  }
}
