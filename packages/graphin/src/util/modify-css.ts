function modifyCSS(dom: any, css: any) {
  if (dom) {
    for (const key in css) {
      if (css.hasOwnProperty(key)) {
        dom.style.cursor = css[key];
      }
    }
  }
  return dom;
}

export { modifyCSS };
