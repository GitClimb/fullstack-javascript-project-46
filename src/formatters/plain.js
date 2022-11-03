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

const plain = (values, path) => {
  const keys = Object.keys(values);

  const iter = (keyss) => keyss.reduce((acc, key) => {
    const part = keys.filter((keyy) => keyy.slice(2) === key.slice(2));
    if (part.length > 1) {
      const massage = `Property '${path}${key.slice(2)}' was updated. From ${type(isSost(values[part[0]]))} to ${type(isSost(values[part[1]]))}`;
      return [...acc, massage];
    }
    if (!key.startsWith('-') && !key.startsWith('+') && _.isObject(values[key])) {
      const fullPath = `${path}${key}.`;
      const massage = plain(values[key], fullPath);
      return [...acc, massage];
    }

    if (key.startsWith('+ ')) {
      const massage = `Property '${path}${key.slice(2)}' was added with value: ${type(isSost(values[key]))}`;
      return [...acc, massage];
    }
    if (key.startsWith('- ')) {
      const massage = `Property '${path}${key.slice(2)}' was removed`;
      return [...acc, massage];
    }
    return acc;
  }, []);
  const getUp = iter(keys).flat(Infinity);
  const Up = getUp.filter((el, id) => getUp.indexOf(el) === id);
  return Up.join('\n');
};

export default plain;
