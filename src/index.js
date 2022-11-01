import _ from 'lodash';
import selectFormat from './formatters/index.js';

export const compare = (coll1, coll2) => {
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

export const genDiff = (file1, file2, formatName) => {
  const compareFiles = compare(file1, file2);
  const stringy = selectFormat(compareFiles, formatName);
  return stringy;
};
