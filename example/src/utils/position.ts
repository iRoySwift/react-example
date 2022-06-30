export const LEFT = 'left';
export const RIGHT = 'right';
export const TOP = 'top';
export const CENTER = 'center'; // These are both the same externally so you can use either,
export const MIDDLE = 'center'; // but have different meaning inside this file (center->left/right, middle->top/bottom)
export const BOTTOM = 'bottom';
export const AUTO = 'auto';

/**
 * 元素的大小及其相对于视口的位置
 * @param elem 元素
 * @returns
 */
export function boundingRect(elem) {
  // const $elem = $(elem);
  // const pos = $elem.offset();
  // const width = $elem.outerWidth(false);
  // const height = $elem.outerHeight(false);
  // return {
  //   top: pos.top,
  //   right: pos.left + width,
  //   bottom: pos.top + height,
  //   left: pos.left,
  //   width,
  //   height
  // };
  return elem.getBoundingClientRect();
}

/**
 * 获取浏览器窗口尺寸
 */
export function screenRect() {
  // const $window = $(window);
  const $window = window;
  // const width = $window.width();
  const width = $window.innerWidth;
  // const height = $window.height();
  const height = $window.innerHeight;

  const top = window.pageYOffset;
  const left = window.pageXOffset;
  return {
    top,
    right: left + width,
    bottom: top + height,
    left,
    width,
    height
  };
}
