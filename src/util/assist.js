/**
 *  验证某个字段是否存在
 * @param value
 * @param valueList
 * @returns {boolean}
 */
export function oneOf(value, valueList) {
  for (let i = 0, len = valueList.length; i < len; i++) {
    if(value === valueList[i]){
      return true;
    }
  }
  return false;
}

/**
 *  将驼峰转成括折号  即
 *  aAaaBaa => a-aaa-baa
 * */
export function camelcaseToHyphen(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
