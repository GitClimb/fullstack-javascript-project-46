import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';

test('gendiff', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => parseFile(getFixturePath(filename));

  expect(genDiff(readFile('testFile1.json'), readFile('testFile2.json'))).toEqual(`{
  - follow: false 
    host: hexlet.io 
  - proxy: 123.234.53.22 
  - timeout: 50 
  + timeout: 20 
  + verbose: true
}`);
});
