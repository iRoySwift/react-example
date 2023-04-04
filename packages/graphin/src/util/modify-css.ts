/*
 * @Author: Roy
 * @Date: 2022-07-28 17:27:27
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-11 18:22:43
 * @Description: 修改css
 */
/**
 * 修改dom style
 * @param dom
 * @param css
 * @returns
 */
function modifyCSS(dom: any, css: any) {
  if (dom) {
    for (const key in css) {
      if (css.hasOwnProperty(key)) {
        dom.style[key] = css[key];
      }
    }
  }
  return dom;
}

export { modifyCSS };
