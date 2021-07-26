import { defaultParsers, defaultPaths } from '../src/defaults';

describe('defaultParsers', () => {
  let parsers: string[];

  beforeAll(() => {
    parsers = defaultParsers.map((parser) => parser.extensions()).flat();
  });

  it('should contain JSON parsers', () => {
    expect(parsers).toContain('json');
    expect(parsers).toContain('json5');
  });

  it('should contain the TOML parser', () => {
    expect(parsers).toContain('toml');
  });

  it('should contain the YAML parser', () => {
    expect(parsers).toContain('yaml');
  });

  it('should contain the INI parser', () => {
    expect(parsers).toContain('ini');
  });
});

describe('defaultPaths', () => {
  let paths: string[];

  beforeAll(() => {
    process.env.HOME = '/home/jest';
    paths = defaultPaths.map((fn) => fn('test'));
  });

  it('should contain the current working directory', () => {
    expect(paths).toContain(process.cwd());
  });

  it('should contain the .config directory', () => {
    expect(paths).toContain(`${process.cwd()}/.config`);
  });

  it('should contain the $HOME directory', () => {
    expect(paths).toContain(`/home/jest/.test`);
  });

  it('should contain the `/etc` directory', () => {
    expect(paths).toContain(`/etc/test`);
  });
});
