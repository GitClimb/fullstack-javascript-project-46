import selectFormat from './formatters/index.js';
import compare from './compare.js';
import parseFile from './parsers.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fil1 = parseFile(filePath1);
  const fil2 = parseFile(filePath2);
  const compareFiles = compare(fil1, fil2);
  const stringy = selectFormat(compareFiles, formatName);
  return stringy;
};

export default genDiff;
