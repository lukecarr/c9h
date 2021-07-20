/* eslint-disable @typescript-eslint/no-explicit-any */
import loadFile from '../src/load';
import toml from '../src/parsers/toml';
import json5 from '../src/parsers/json5';

describe('file loading', () => {
  it('should load files', () => {
    let loaded = loadFile('example', ['./test'], [toml]);

    expect(loaded).toBeTruthy();

    loaded = loaded as Partial<any>;

    expect(loaded).toHaveProperty('hello');
    expect(loaded.hello).toHaveLength(1);
    expect(loaded.hello).toContain('world');
  });

  it('should return false if no files are found', () => {
    expect(loadFile('example', ['./test'], [json5])).toBeFalsy();
  });
});
