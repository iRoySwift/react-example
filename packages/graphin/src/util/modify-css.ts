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
