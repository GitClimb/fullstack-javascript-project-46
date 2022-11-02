import _ from 'lodash';

const isSost = (valut) => {
  if (_.isObject(valut)) {
    return `${'[complex value]'}`;
  }
  return valut;
};
const type = (part) => {
  if (typeof part === 'string' && part !== '[complex value]') {
    return `'${part}'`;
  }
  return part;
};

const plain = (values, path = '') => {
  const keys = Object.keys(values);
  const result = [];

  for (let i = 0; i < keys.length; i += 1) {
    const part = keys[i];
    let fill = path;

    if (!part.startsWith('-') && !part.startsWith('+') && _.isObject(values[part])) {
      fill = `${fill}${part}.`;
      result.push(`${plain(values[part], fill)}`);
    } else if (keys[i + 1] !== undefined && part.slice(2) === keys[i + 1].slice(2)) {
      const partt = `Property '${path}${part.slice(2)}' was updated. From ${type(isSost(values[part]))} to ${type(isSost(values[keys[i + 1]]))}`;
      i += 1;
      result.push(partt);
    } else if (part.startsWith('+ ')) {
      result.push(`Property '${path}${part.slice(2)}' was added with value: ${type(isSost(values[part]))}`);
    } else if (part.startsWith('- ')) {
      result.push(`Property '${path}${part.slice(2)}' was removed`);
    }
  }
  return result.join('\n');
};

export default plain;
