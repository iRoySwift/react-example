function isObject(value) {
    const type = typeof value;
    return type !== null && type === "object";
}

function clone(source) {
    if (!isObject(source)) return source;
    var target = {};
    for (const key in source) {
        if (Object.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }
    return target;
}

function isHorizontalPort(bbox, port) {
    const dx = Math.abs(port.x - bbox.centerX);
    const dy = Math.abs(port.y - bbox.centerY);
    return dx / bbox.width > dy / bbox.height;
}

/**
 * 获取扩展区域
 * @param {*} node
 * @param {*} offset
 * @returns
 */
function getExpandedBBox(node, offset) {
    const bbox = clone(node.bbox);
    return {
        centerX: bbox.centerX,
        centerY: bbox.centerY,
        minX: bbox.minX - offset,
        minY: bbox.minY - offset,
        maxX: bbox.maxX + offset,
        maxY: bbox.maxY + offset,
        height: bbox.height + 2 * offset,
        width: bbox.width + 2 * offset
    };
}

/**
 * 获取扩展区域上的连接点
 * @param {*} node
 * @param {*} port
 */
function getExpandedPort(bbox, port) {
    if (isHorizontalPort(bbox, port)) {
        return {
            x: port.x > bbox.centerX ? bbox.maxX : bbox.minX,
            y: port.y
        };
    }
    return {
        x: port.x,
        y: port.y > bbox.centerY ? bbox.maxY : bbox.minY
    };
}

// 根据点获取连线bbox
function getBBoxFromVertexes(sPoint, tPoint) {
    const minX = Math.min(sPoint.x, tPoint.x);
    const maxX = Math.max(sPoint.x, tPoint.x);
    const minY = Math.min(sPoint.y, tPoint.y);
    const maxY = Math.max(sPoint.y, tPoint.y);
    return {
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
        maxX,
        maxY,
        minX,
        minY,
        height: maxY - minY,
        width: maxX - minX
    };
}

// 合并盒子扩展区
function combineBBoxes(sBBox, tBBox) {
    const minX = Math.min(sBBox.minX, tBBox.minX);
    const minY = Math.min(sBBox.minY, tBBox.minY);
    const maxX = Math.max(sBBox.maxX, tBBox.maxX);
    const maxY = Math.max(sBBox.maxY, tBBox.maxY);
    return {
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
        minX,
        minY,
        maxX,
        maxY,
        height: maxY - minY,
        width: maxX - minX
    };
}

// 获取盒子顶点
function vertexOfBBox(bbox) {
    const { minX, minY, maxX, maxY } = bbox;
    return [
        { x: minX, y: minY },
        { x: maxX, y: minY },
        { x: maxX, y: maxY },
        { x: minX, y: maxY }
    ];
}

// 获取盒子十字线顶点
function crossPointsByLineAndBBox(bbox, centerPoint) {
    let crossPoint = [];
    if (!(centerPoint.x < bbox.minX || centerPoint.x > bbox.maxX)) {
        crossPoint = [
            ...crossPoint,
            { x: centerPoint.x, y: bbox.minY },
            { x: centerPoint.x, y: bbox.maxY }
        ];
    }
    if (!(centerPoint.y < bbox.minY || centerPoint.y > bbox.maxY)) {
        crossPoint = [
            ...crossPoint,
            { x: bbox.minX, y: centerPoint.y },
            { x: bbox.maxX, y: centerPoint.y }
        ];
    }
    return crossPoint;
}

/**
 * 获取合法折点集
 * @param {*} sBBox
 * @param {*} tBBox
 * @param {*} sPoint
 * @param {*} tPoint
 */
function getConnectablePoints(sBBox, tBBox, sPoint, tPoint) {
    let lineBBox = getBBoxFromVertexes(sPoint, tPoint);
    let sMixBBox = combineBBoxes(sBBox, lineBBox);
    let tMixBBox = combineBBoxes(tBBox, lineBBox);
    let points = [...vertexOfBBox(sMixBBox), ...vertexOfBBox(tMixBBox)];
    const centerPoint = {
        x: (sPoint.x + tPoint.x) / 2,
        y: (sPoint.y + tPoint.y) / 2
    };
    let bboxes = [sMixBBox, tMixBBox, lineBBox];
    // bboxes.forEach(bbox => {
    //     points = [...points, ...crossPointsByLineAndBBox(bbox, centerPoint)];
    // });
    // points.push(...crossPointsByLineAndBBox(sMixBBox, centerPoint));
    points.push(...crossPointsByLineAndBBox(tMixBBox, centerPoint));
    points.push({ x: sPoint.x, y: tPoint.y });
    points.push({ x: tPoint.x, y: sPoint.y });
    return points;
}

function filterConnectablePoints(points, bbox) {
    return points.filter(point => {
        return (
            point.x < bbox.minX ||
            point.x > bbox.maxX ||
            point.y < bbox.minY ||
            point.y > bbox.maxY
        );
    });
}

// 获取节点带 offset 的区域（扩展区域）
function polylineFinding(sNode, tNode, sPort, tPort, offset) {
    // 获取扩展区域
    let [sBBox, tBBox] = [
        getExpandedBBox(sNode, offset),
        getExpandedBBox(tNode, offset)
    ];
    // 获取扩展区域上的连接点
    let [sPoint, tPoint] = [
        getExpandedPort(sBBox, sPort),
        getExpandedPort(tBBox, tPort)
    ];
    let outerBBox = combineBBoxes(sBBox, tBBox);
    // 获取合法折点集
    let points = getConnectablePoints(sBBox, tBBox, sPoint, tPoint);
    // 过滤合法点集，预处理、剪枝等
    // filterConnectablePoints(points, sBBox);
    // filterConnectablePoints(points, tBBox);
    // 用 A-Star 算法寻径
    let polylinePoints = AStar(points, sPoint, tPoint, sBBox, tBBox);
    polylinePoints.unshift(sPort);
    polylinePoints.push(tPort);
    return polylinePoints;
}

/**
 * 获取路径点
 * @param {*} points【】 线上所有点
 * @param {*} source 起始节点
 * @param {*} target 终点
 */
function getPathByPoints(points, source, target, offset) {
    return polylineFinding(
        source,
        target,
        points[0],
        points[points.length - 1],
        offset
    );
}

function heuristic(node, goal) {
    let D = 1; // 两个相邻节点之间的移动代价
    const dx = Math.abs(node.x - goal.x);
    const dy = Math.abs(node.y - goal.y);
    return D * (dx + dy);
}

const crossBBox = function(bboxes, p1, p2) {
    for (let i = 0; i < bboxes.length; i++) {
        const bbox = bboxes[i];
        if (p1.x === p2.x && bbox.minX < p1.x && bbox.maxX > p1.x) {
            if (
                (p1.y < bbox.maxY && p2.y >= bbox.maxY) ||
                (p2.y < bbox.maxY && p1.y >= bbox.maxY)
            ) {
                return true;
            }
        } else if (p1.y === p2.y && bbox.minY < p1.y && bbox.maxY > p1.y) {
            if (
                (p1.x < bbox.maxX && p2.x >= bbox.maxX) ||
                (p2.x < bbox.maxX && p1.x >= bbox.maxX)
            ) {
                return true;
            }
        }
    }
    return false;
};

// 寻径
function AStar(points, sPoint, tPoint, sBBox, tBBox) {
    /** 待访问的节点 **/
    const openList = [sPoint];
    /** 已访问的节点 **/
    const closeList = [];
    points.forEach((item, i) => (item.id = `${item.x}-${item.y}`));

    let tmpArr = [];
    points.forEach(item => {
        if (!tmpArr.find(target => target.id === item.id)) {
            tmpArr.push(item);
        }
    });
    points = [...tmpArr, tPoint];
    let endPoint;
    while (openList.length > 0) {
        let minCostPoint;
        openList.forEach((p, i) => {
            // f(n) = g(n) + h(n)
            if (!p.parent) p.f = 0;
            if (!minCostPoint) minCostPoint = p;
            if (p.f < minCostPoint.f) minCostPoint = p;
        });
        if (minCostPoint.x === tPoint.x && minCostPoint.y === tPoint.y) {
            endPoint = minCostPoint;
            break;
        }
        openList.splice(
            openList.findIndex(
                o => o.x === minCostPoint.x && o.y === minCostPoint.y
            ),
            1
        );
        closeList.push(minCostPoint);
        const neighbor = points.filter(p => {
            return (
                (p.x === minCostPoint.x || p.y === minCostPoint.y) &&
                !(p.x === minCostPoint.x && p.y === minCostPoint.y) &&
                !crossBBox([sBBox, tBBox], minCostPoint, p)
            );
        });
        neighbor.forEach(p => {
            const inOpen = openList.find(o => o.x === p.x && o.y === p.y);
            const inClose = closeList.find(o => o.x === p.x && o.y === p.y);
            const currentG = heuristic(p, minCostPoint);
            let point = clone(p);
            if (!inClose) {
                if (inOpen) {
                    if (point.g > currentG) {
                        point.parent = minCostPoint;
                        point.g = currentG;
                        point.f = point.g + point.h;
                    }
                } else {
                    point.parent = minCostPoint;
                    point.g = currentG;
                    let h = heuristic(point, tPoint);
                    point.h = h;
                    point.f = point.g + point.h;
                    openList.push(point);
                }
            }
        });
    }
    if (endPoint) {
        const result = [];
        result.push({
            x: endPoint.x,
            y: endPoint.y
        });
        // 终点逆向查找
        while (endPoint.parent) {
            endPoint = endPoint.parent;
            result.push({
                x: endPoint.x,
                y: endPoint.y
            });
        }
        return result.reverse();
    }
    return [];
}

function isBending(p0, p1, p2) {
    return !(
        (p0.x === p1.x && p1.x === p2.x) ||
        (p0.y === p1.y && p1.y === p2.y)
    );
}

function getBorderRadiusPoints(p0, p1, p2, r) {
    const d0 = heuristic(p0, p1);
    const d1 = heuristic(p2, p1);
    if (d0 < r) {
        r = d0;
    }
    if (d1 < r) {
        r = d1;
    }
    const ps = {
        x: p1.x - (r / d0) * (p1.x - p0.x),
        y: p1.y - (r / d0) * (p1.y - p0.y)
    };
    const pt = {
        x: p1.x - (r / d1) * (p1.x - p2.x),
        y: p1.y - (r / d1) * (p1.y - p2.y)
    };
    return [ps, pt];
}

/**
 * 弯角
 */
function getPathWithBorderRadiusByPolyline(points) {
    const cornerLen = 5;
    const path = [];
    points.forEach((point, i) => {
        if (i === 0) {
            path.push(["M", point.x, point.y]);
        } else if (i === points.length - 1) {
            path.push(["L", point.x, point.y]);
        } else {
            const prevPoint = points[i - 1];
            const nextPoint = points[i + 1];
            if (isBending(prevPoint, point, nextPoint)) {
                const [ps, pt] = getBorderRadiusPoints(
                    prevPoint,
                    point,
                    nextPoint,
                    cornerLen
                );
                path.push(["L", ps.x, ps.y]);
                path.push(["Q", point.x, point.y, pt.x, pt.y]);
                path.push(["L", pt.x, pt.y]);
            } else {
                path.push(["L", point.x, point.y]);
            }
        }
    });
    return path;
}
export { getPathByPoints, AStar, heuristic, getPathWithBorderRadiusByPolyline };
