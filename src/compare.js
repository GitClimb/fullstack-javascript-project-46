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
    } if (!keysColl2.includes(key)) {
      acc[`- ${key}`] = coll1[key];
    } else if (!keysColl1.includes(key)) {
      acc[`+ ${key}`] = coll2[key];
    } else if (coll1[key] !== coll2[key]) {
      acc[`- ${key}`] = coll1[key];
      acc[`+ ${key}`] = coll2[key];
    } else {
      acc[`${key}`] = coll1[key];
    }

    return acc;
  }, {});

  return diff;
};

export default compare;
