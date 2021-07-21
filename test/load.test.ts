/* eslint-disable @typescript-eslint/no-explicit-any */
import loadFiles from '../src/load';
import toml from '../src/parsers/toml';
import json5 from '../src/parsers/json5';
import yaml from '../src/parsers/yaml';

describe('file loading', () => {
  it('should load files', () => {
    const loaded = loadFiles('example', ['./test'], [toml], false);

    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toHaveProperty('hello');
    expect(loaded[0].hello).toHaveLength(1);
    expect(loaded[0].hello).toContain('world');
  });

  it('should return the first file found if the many parameter is false', () => {
    const loaded = loadFiles('example', ['./test'], [toml, yaml], false);

    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toHaveProperty('hello');
    expect(loaded[0].hello).toHaveLength(1);
    expect(loaded[0].hello).toContain('world');
  });

  it('should return multiple files if the many parameter is true', () => {
    const loaded = loadFiles('example', ['./test'], [toml, yaml], true);

    expect(loaded).toHaveLength(2);
    expect(loaded[0]).toHaveProperty('hello');
    expect(loaded[0].hello).toHaveLength(1);
    expect(loaded[0].hello).toContain('world');
    expect(loaded[1]).toHaveProperty('hello');
    expect(loaded[1].hello).toHaveLength(1);
    expect(loaded[1].hello).toContain('hi there');
  });

  it('should return an empty array if no files are found', () => {
    expect(loadFiles('example', ['./test'], [json5], false)).toHaveLength(0);
  });
});
