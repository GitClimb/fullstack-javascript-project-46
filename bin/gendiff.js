#! /usr/bin/env node

import { program } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import genDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const file1 = path.resolve(process.cwd(), filepath1);
    const file2 = path.resolve(process.cwd(), filepath2);
    const readFile1 = JSON.parse(fs.readFileSync(file1));
    const readFile2 = JSON.parse(fs.readFileSync(file2));
    console.log(genDiff(readFile1, readFile2));
  });

program.parse();
