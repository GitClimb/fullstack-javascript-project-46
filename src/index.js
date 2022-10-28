import _ from 'lodash';

const compare = (coll1, coll2) => {
  const keysColl1 = _.keys(coll1);
  const keysColl2 = _.keys(coll2);
  const ollKeys = _.sortBy(keysColl1.concat(keysColl2));
  const uniqueKeys = [];
  ollKeys.filter((part) => (!uniqueKeys.includes(part) ? uniqueKeys.push(part) : part));

  const diff = uniqueKeys.reduce((acc, key) => {
    if (_.isObject(coll1[key]) && _.isObject(coll2[key])) {
      acc[`${key}`] = compare(coll1[key], coll2[key]);
    }
    if (!keysColl2.includes(key)) {
      acc[`- ${key}`] = coll1[key];
    }
    if (!keysColl1.includes(key)) {
      acc[`+ ${key}`] = coll2[key];
    }
    if (keysColl1.includes(key) && keysColl2.includes(key)) {
      if (coll1[key] > coll2[key]) {
        acc[`- ${key}`] = coll1[key];
        acc[`+ ${key}`] = coll2[key];
      }
      if (coll1[key] < coll2[key]) {
        acc[`- ${key}`] = coll1[key];
        acc[`+ ${key}`] = coll2[key];
      }
      if (coll1[key] === coll2[key]) {
        acc[`${key}`] = coll1[key];
      }
    }
    return acc;
  }, {});

  return diff;
};

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, detph) => {
    if (!Object.is(typeof currentValue, typeof []) || currentValue === null) {
      return `${currentValue}`;
    }

    const indentSize = detph * spacesCount;
    const frontIndent = replacer.repeat(indentSize - 1);
    const rearIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        if (key.startsWith('+ ') || key.startsWith('- ')) {
          return `${frontIndent}${key}: ${iter(val, detph + 1)}`;
        }
        return `${frontIndent}  ${key}: ${iter(val, detph + 1)}`;
      });
    return ['{', ...lines, `${rearIndent}}`].join('\n');
  };

  return iter(value, 1);
};

const genDiff = (file1, file2) => {
  const compareFiles = compare(file1, file2);
  const stringy = stringify(compareFiles, '  ', 2);
  return stringy;
};

export default genDiff;
