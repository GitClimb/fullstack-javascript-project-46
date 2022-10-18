import _ from 'lodash';

const compare = (coll1, coll2) => {
  const keysColl1 = _.keys(coll1);
  const keysColl2 = _.keys(coll2);
  const ollKeys = _.sortBy(keysColl1.concat(keysColl2));
  const uniqueKeys = [];
  ollKeys.filter((part) => (!uniqueKeys.includes(part) ? uniqueKeys.push(part) : part));

  const diff = uniqueKeys.reduce((acc, key) => {
    if (keysColl1.includes(key) && !keysColl2.includes(key)) {
      acc.push(`  - ${key}: ${coll1[key]}`);
    } else if (!keysColl1.includes(key) && keysColl2.includes(key)) {
      acc.push(`  + ${key}: ${coll2[key]}`);
    } else if (coll1[key] > coll2[key]) {
      acc.push(`  - ${key}: ${coll1[key]}`);
      acc.push(`  + ${key}: ${coll2[key]}`);
    } else if (coll1[key] < coll2[key]) {
      acc.push(`  + ${key}: ${coll1[key]}`);
      acc.push(`  - ${key}: ${coll2[key]}`);
    } else if (keysColl1.includes(key) === keysColl2.includes(key)) {
      acc.push(`    ${key}: ${coll2[key]}`);
    }
    return acc;
  }, []);

  return diff;
};

export default compare;
