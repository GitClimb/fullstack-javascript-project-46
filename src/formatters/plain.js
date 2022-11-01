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
    let fil = path;

    if (!part.startsWith('-') && !part.startsWith('+') && _.isObject(values[part])) {
      fil = `${fil}${part}.`;
      result = `${result}${plain(values[part], fil)}`;
    } else if (keys[i + 1] !== undefined && part.slice(2) === keys[i + 1].slice(2)) {
      result = `${result}\n Property '${path}${part.slice(2)}' was updated. From ${type(isSost(values[part]))} to ${type(values[keys[i + 1]])}`;
      i += 1;
    } else if (part.startsWith('+ ')) {
      result = `${result}\n Property '${path}${part.slice(2)}' was added with value: ${type(isSost(values[part]))}`;
    } else if (part.startsWith('- ')) {
      result = `${result}\n ${`Property '${path}${part.slice(2)}' was removed`}`;
    }
  }
  return result;
};

export default plain;
