const isObject = <T>(object: T) => object != null && typeof object === 'object';

export const sameServerData = <T>(firstObj:T, secondObj: T) => {
  const keys1 = Object.keys(firstObj);
  const keys2 = Object.keys(secondObj);
  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = firstObj[key];
    const val2 = secondObj[key];
    const areObjects = isObject<T>(val1) && isObject<T>(val2);
    if (
      (areObjects && !sameServerData(val1, val2))
      || (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};
