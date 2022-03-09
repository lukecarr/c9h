declare module 'args-parser' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function Parse(argv: string[]): any;

  export = Parse;
}
