import * as fs from 'node:fs';
import * as path from 'node:path';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  const configPath = path.resolve(process.cwd(), filepath);
  const format = path.extname(configPath);
  const data = fs.readFileSync(configPath);

  if (format === '.yaml' || format === '.yml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};

export default parseFile;
