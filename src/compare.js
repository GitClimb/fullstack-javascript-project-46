import _ from 'lodash';

const compare = (coll1, coll2) => {
  const keysColl1 = _.keys(coll1);
  const keysColl2 = _.keys(coll2);
  const ollKeys = _.sortBy(keysColl1.concat(keysColl2));
  const uniqueKeys = ollKeys
    .filter((el, id) => ollKeys.indexOf(el) === id)
    .reduce((acc, key) => {
      const result = { ...acc };
      if (_.isObject(coll1[key]) && _.isObject(coll2[key])) {
        result[`${key}`] = compare(coll1[key], coll2[key]);
      } else if (!keysColl2.includes(key)) {
        result[`- ${key}`] = coll1[key];
      } else if (!keysColl1.includes(key)) {
        result[`+ ${key}`] = coll2[key];
      } else {
        if (coll1[key] !== coll2[key]) {
          result[`- ${key}`] = coll1[key];
          result[`+ ${key}`] = coll2[key];
        }
        if (coll1[key] === coll2[key]) {
          result[`${key}`] = coll1[key];
        }
      }
      return result;
    }, {});

  return uniqueKeys;
};

export default compare;
