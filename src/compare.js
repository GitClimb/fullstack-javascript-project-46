import _ from 'lodash';

const compare = (coll1, coll2) => {
  const keysColl1 = _.keys(coll1);
  const keysColl2 = _.keys(coll2);
  const ollKeys = _.sortBy(keysColl1.concat(keysColl2));
  const uniqueKeys = ollKeys.filter((el, id) => ollKeys.indexOf(el) === id);

  const diff = uniqueKeys.reduce((acc, key) => {
    if (_.isObject(coll1[key]) && _.isObject(coll2[key])) {
      const keys = [`${key}`];
      const value = compare(coll1[key], coll2[key]);
      return { ...acc, [keys]: value };
    }
    if (!keysColl2.includes(key)) {
      const keys = [`- ${key}`];
      const value = coll1[key];
      return { ...acc, [keys]: value };
    }
    if (!keysColl1.includes(key)) {
      const keys = [`+ ${key}`];
      const value = coll2[key];
      return { ...acc, [keys]: value };
    }
    if (coll1[key] !== coll2[key]) {
      const keys1 = [`- ${key}`];
      const keys2 = [`+ ${key}`];
      const value1 = coll1[key];
      const value2 = coll2[key];
      return { ...acc, [keys1]: value1, [keys2]: value2 };
    }
    if (coll1[key] === coll2[key]) {
      const keys = [`${key}`];
      const value = coll1[key];
      return { ...acc, [keys]: value };
    }

    return acc;
  }, {});

  return diff;
};

export default compare;
