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
