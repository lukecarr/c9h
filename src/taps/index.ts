import { Tap } from 'taps/base';
import { ArgvTap } from 'taps/argv';
import { EnvTap } from 'taps/env';
import { HttpTap } from 'taps/http';
import { IniTap } from 'taps/fs/ini';
import { JsonTap } from 'taps/fs/json';
import { Json5Tap } from 'taps/fs/json5';
import { TomlTap } from 'taps/fs/toml';
import { YamlTap } from 'taps/fs/yaml';

export const DEFAULT_TAPS: Tap[] = [
  new JsonTap(),
  new Json5Tap(),
  new IniTap(),
  new TomlTap(),
  new YamlTap(),
  new EnvTap(),
  new ArgvTap(),
];

export { ArgvTap, EnvTap, HttpTap, IniTap, JsonTap, Json5Tap, TomlTap, YamlTap };
