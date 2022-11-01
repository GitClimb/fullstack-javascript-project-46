import _ from 'lodash';

const plain = (values, path = '') => {
  const keys = Object.keys(values);
  let result = '';
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

  for (let i = 0; i < keys.length; i += 1) {
    const part = keys[i];
    let fill = path;

    if (!part.startsWith('-') && !part.startsWith('+') && _.isObject(values[part])) {
      fill = `${fill}${part}.`;
      result = `${result}${plain(values[part], fill)}\n`;
    } else if (keys[i + 1] !== undefined && part.slice(2) === keys[i + 1].slice(2)) {
      result = `${result}Property '${path}${part.slice(2)}' was updated. From ${type(isSost(values[part]))} to ${type(isSost(values[keys[i + 1]]))}\n`;
      i += 1;
    } else if (part.startsWith('+ ')) {
      result = `${result}Property '${path}${part.slice(2)}' was added with value: ${type(isSost(values[part]))}\n`;
    } else if (part.startsWith('- ')) {
      result = `${result}${`Property '${path}${part.slice(2)}' was removed`}\n`;
    }
  }
  return result.slice(0, result.length - 1);
};

export default plain;
