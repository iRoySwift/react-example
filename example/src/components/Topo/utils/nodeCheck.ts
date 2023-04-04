/*
 * @Author: Roy
 * @Date: 2022-08-12 17:54:08
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-16 16:40:23
 * @Description: 检查节点重叠
 */

import { IG6GraphEvent } from '@suning/uxcool-graphin';

export default function nodeCheck() {}

function checkNodeOverlap(this, e: IG6GraphEvent) {
  const { item } = e;
  return item;
}

function isOverlap(item1, item2) {
  let minPoint = { x: item1.minX, y: item1.minY };
  let min2Point = { x: item1.maxX, y: item1.minY };
  let maxPoint = { x: item1.maxX, y: item1.maxY };
  let max2Point = { x: item1.minX, y: item1.maxY };
  let bbox = item2.getBBox();
  if (isPointInsideBBox(minPoint, bbox) || isPointInsideBBox(min2Point, bbox) || isPointInsideBBox(maxPoint, bbox) || isPointInsideBBox(max2Point, bbox)) {
    return true;
  }
  return false;
}

function getBBox(e) {
  const { x, y } = e;
  // const { width, height } = item.getBBox();
  const width = 95,
    height = 95;
  const minX = x - width / 2;
  const minY = y - height / 2;
  return {
    x: minX,
    y: minY,
    width,
    height,
    minX,
    minY,
    maxX: minX + width,
    maxY: minY + height,
    centerX: x,
    centerY: y
  };
}

function isPointInsideBBox(point, bbox) {
  return point.x <= bbox.maxX && point.x >= bbox.minX && point.y <= bbox.maxY && point.y >= bbox.minY;
}
export { checkNodeOverlap, isOverlap, getBBox };
