/* eslint-disable @typescript-eslint/no-explicit-any */
import { fileExists, load, loadSync } from '../src/load';
import toml from '../src/parsers/toml';
import json5 from '../src/parsers/json5';
import yaml from '../src/parsers/yaml';

describe('the fileExists function', () => {
  it('should asynchronously check if a file exists', async () => {
    expect(await fileExists('./test/load.test.ts')).toBeTruthy();
    expect(await fileExists('./test/load.testa.ts')).toBeFalsy();
  });
});

describe('asynchronous file loading', () => {
  it('should load files', async () => {
    const loaded = await load('example', ['./test'], [toml], false);

    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toHaveProperty('hello');
    expect(loaded[0].hello).toHaveLength(1);
    expect(loaded[0].hello).toContain('world');
  });

  it('should return the first file found if the many parameter is false', async () => {
    const loaded = await load('example', ['./test'], [toml, yaml], false);

    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toHaveProperty('hello');
    expect(loaded[0].hello).toHaveLength(1);
    expect(loaded[0].hello).toContain('world');
  });

  it('should return multiple files if the many parameter is true', async () => {
    const loaded = await load('example', ['./test'], [toml, yaml], true);

    expect(loaded).toHaveLength(2);
    expect(loaded[0]).toHaveProperty('hello');
    expect(loaded[0].hello).toHaveLength(1);
    expect(loaded[0].hello).toContain('world');
    expect(loaded[1]).toHaveProperty('hello');
    expect(loaded[1].hello).toHaveLength(1);
    expect(loaded[1].hello).toContain('hi there');
  });

  it('should return an empty array if no files are found', async () => {
    expect(await load('example', ['./test'], [json5], false)).toHaveLength(0);
  });
});

describe('synchronous file loading', () => {
  it('should load files', () => {
    const loaded = loadSync('example', ['./test'], [toml], false);

    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toHaveProperty('hello');
    expect(loaded[0].hello).toHaveLength(1);
    expect(loaded[0].hello).toContain('world');
  });

  it('should return the first file found if the many parameter is false', () => {
    const loaded = loadSync('example', ['./test'], [toml, yaml], false);

    expect(loaded).toHaveLength(1);
    expect(loaded[0]).toHaveProperty('hello');
    expect(loaded[0].hello).toHaveLength(1);
    expect(loaded[0].hello).toContain('world');
  });

  it('should return multiple files if the many parameter is true', () => {
    const loaded = loadSync('example', ['./test'], [toml, yaml], true);

    expect(loaded).toHaveLength(2);
    expect(loaded[0]).toHaveProperty('hello');
    expect(loaded[0].hello).toHaveLength(1);
    expect(loaded[0].hello).toContain('world');
    expect(loaded[1]).toHaveProperty('hello');
    expect(loaded[1].hello).toHaveLength(1);
    expect(loaded[1].hello).toContain('hi there');
  });

  it('should return an empty array if no files are found', () => {
    expect(loadSync('example', ['./test'], [json5], false)).toHaveLength(0);
  });
});
