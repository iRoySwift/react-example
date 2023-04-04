import { G6, IG6GraphEvent } from '@suning/uxcool-graphin';

const tooltip = new G6.Tooltip({
  offsetX: -200,
  offsetY: -30,
  getContent(e: any) {
    const item = e.item;
    const tooltips = item.getModel().model.tooltip;
    const outDiv = document.createElement('div');
    let str = '';
    let width = 100;
    let maxLength = 0;
    tooltips &&
      Object.keys(tooltips).map((el: any) => {
        if (tooltips[el].length > maxLength) {
          maxLength = tooltips[el].length;
        }
        str += `<li>${el}:${tooltips[el]}</li>`;
        return str;
      });
    width += maxLength * 10;
    outDiv.style.width = `${width}px`;
    outDiv.innerHTML = `
      <ul style="list-style: none;padding:0;margin:0;">
        ${str}
      </ul>`;
    return outDiv;
  },
  itemTypes: ['node'],
  trigger: 'mouseenter',
  shouldBegin(e: IG6GraphEvent | undefined) {
    if (!e) return true;
    const item: any = e?.item;
    const tooltips = item.getModel().model.tooltip;
    if (!tooltips) {
      return false;
    }
    return true;
  }
});

export default tooltip;
