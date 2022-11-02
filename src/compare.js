import _ from 'lodash';

const compare = (coll1, coll2) => {
  const keysColl1 = _.keys(coll1);
  const keysColl2 = _.keys(coll2);
  const ollKeys = _.sortBy(keysColl1.concat(keysColl2));
  const uniqueKeys = ollKeys.filter((el, id) => ollKeys.indexOf(el) === id);

  return uniqueKeys.reduce((acc, key) => {
    const all = acc;
    if (_.isObject(coll1[key]) && _.isObject(coll2[key])) {
      all[`${key}`] = compare(coll1[key], coll2[key]);
    } else if (!keysColl2.includes(key)) {
      all[`- ${key}`] = coll1[key];
    } else if (!keysColl1.includes(key)) {
      all[`+ ${key}`] = coll2[key];
    } else if (coll1[key] !== coll2[key]) {
      all[`- ${key}`] = coll1[key];
      all[`+ ${key}`] = coll2[key];
    } else {
      all[`${key}`] = coll1[key];
    }
    return all;
  }, {});
};

export default compare;
