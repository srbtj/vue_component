/**
 *  验证某个字段是否存在
 * @param value
 * @param valueList
 * @returns {boolean}
 */
export function oneOf(value, valueList) {
  for (let i = 0, len = valueList.length; i < len; i++) {
    if (value === valueList[i]) {
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

/****
 *  返回顶部动画
 * @param el
 * @param from
 * @param to
 * @param duration
 */
export function scrollTop(el, from = 0, to, duration = 500) {

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }

  const difference = Math.abs(from - to); // 运动的距离
  const step = Math.ceil(difference / duration * 50); // 运动的次数

  function scroll(start, end, step) {

    if (start === end) return;

    let d = ( start + step > end ) ? end : start + step;

    if (start > end) {
      d = ( start - step < end ) ? end : start - step;
    }

    if (el === window) {
      // window.scrollTo(x, y);  滚动到指定位置
      window.scrollTo(d, d);
    } else {
      // 设置元素的滚动条的垂直位置
      el.scrollTop = d;
    }

    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
}
