import selectFormat from './formatters/index.js';
import compare from './compare.js';
import parseFile from './parsers.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const file1 = parseFile(filePath1);
  const file2 = parseFile(filePath2);
  const compareFiles = compare(file1, file2);
  const stringy = selectFormat(compareFiles, formatName);
  return stringy;
};

export default genDiff;
