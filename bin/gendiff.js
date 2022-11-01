#! /usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const file1 = parseFile(filepath1);
    const file2 = parseFile(filepath2);
    const diff = genDiff(file1, file2, program.opts().format);
    console.log(diff);
  });

program.parse();
