import selectFormat from './formatters/index.js';
import compare from './compare.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const compareFiles = compare(file1, file2);
  const stringy = selectFormat(compareFiles, formatName);
  return stringy;
};

export default genDiff;
