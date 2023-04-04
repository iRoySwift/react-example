/*
 * @Author: Roy
 * @Date: 2022-08-08 11:08:40
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-11 18:22:05
 * @Description: js 基本方法
 */
/**
 * each([1,2,3],(value,key)=>{})
 * each({'a':1,'b':2},(value,key)=>{})
 * @param collection
 * @param iteratee
 */
function each(collection: Array<any> | Object, iteratee: (value?: any, key?: any, arr?: any) => void) {
  const func = Array.isArray(collection) ? arrayEach : baseEach;
  return func(collection, iteratee);
}

function arrayEach(array: any, iteratee: any) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

function baseEach(collection: any, iteratee: any) {
  if (collection == null) return collection;
  if (!isObject(collection)) return collection;
  const iterable = Object(collection);
  for (const key in collection) {
    if (Object.prototype.hasOwnProperty.call(collection, key)) {
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
  }
  return collection;
}

function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export { each, isObject };
