import plain from './plain.js';
import stylish from './stylish.js';

const selectFormat = (diff, formatName) => {
  if (formatName === 'plain') {
    return plain(diff);
  }
  return stylish(diff, '  ', 2);
};

export default selectFormat;
