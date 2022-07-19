// jquery
const w = 310; // canvas宽度
const h = 155; // canvas高度
const l = 42; // 滑块边长
const r = 9; // 滑块半径
const PI = Math.PI;
const L = l + r * 2 + 3; // 滑块实际边长

let downUrl = '';
/**
 * renderTo
 * captchaMode : float embed popup
 * data
 * onSuccess
 * onError
 * @param {*} argus
 */
function SlideVerify(argus) {
  try {
    if (!argus.renderTo) {
      throw new Error('渲染地址不存在');
    }
    if (!argus.data) {
      throw new Error('渲染数据不存在');
    }
    if (argus.onError && !(typeof argus.onError == 'function')) {
      throw new Error('argus.onError必须是一个函数' + typeof argus.onError);
    }
    if (argus.onSucess && !(typeof argus.onSucess == 'function')) {
      throw new Error('argus.onSucess必须是一个函数' + typeof argus.onSucess);
    }
  } catch (e) {
    alert('数据错误，原因：' + e);
  }

  //调用初始化数据的方法
  this.init(argus);
}

// 初始化数据
SlideVerify.prototype.init = function (argus) {
  this.renderTo = argus.renderTo;
  // 获取对象id
  this.oRenderTo = document.getElementById(this.renderTo);
  this.url = argus.data;
  this.captchaMode = argus.captchaMode;
  this.dataSource = argus.data;
  this.onSucess = argus.onSucess || function () {};
  this.onError = argus.onError || function () {};
  this.width = argus.width || w;
  this.height = argus.height || h;
  this.originX = 0;

  this.byData();
};
// 格式化数据
SlideVerify.prototype.byData = function (argus) {
  var _this = this;
  if (typeof _this.url == 'string') {
    const xhr = new XMLHttpRequest();
    downUrl = getRandomImgSrc();
    xhr.open('GET', downUrl);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function (e) {
      const file = new FileReader(); // FileReader仅支持IE10+
      file.readAsDataURL(e.target.response);
      file.onload = function (e) {
        // this.loading && _this.setLoading(false);
        _this.dataSource = e.target.result;
        _this.build();
      };
      // // url string
      //  const res = JSON.parse(e.target.response);
      // _this.dataSource = res.url;
      // _this.build();
    };
  } else {
    this.build();
  }
};
// 创建元素
SlideVerify.prototype.build = function (argus) {
  // 清空内容
  this.oRenderTo.innerHTML = '';
  this.oRenderTo.style.width = `${this.width}px`;

  // 增加loading
  this.loading = createElement('div', 'loading');
  setSize(this.loading, this.width, this.height);
  var loadingIcon = createElement('div', 'load-icon');
  var loadingText = createElement('span');
  loadingText.innerHTML = '加载中...';
  this.loading.appendChild(loadingIcon);
  this.loading.appendChild(loadingText);

  // canvas
  this.canvasContainer = createElement('div', 'canvas');
  setSize(this.canvasContainer, this.width, this.height);
  var canvas = createCanvas(this.width, this.height);
  this.block = createCanvas(this.width, this.height);
  this.refreshIcon = createElement('div', 'refresh-icon');
  setClass(this.block, 'block');
  this.canvasContainer.appendChild(this.loading);
  this.canvasContainer.appendChild(canvas);
  this.canvasContainer.appendChild(this.block);
  this.canvasContainer.appendChild(this.refreshIcon);
  this.canvasCtx = canvas.getContext('2d');
  this.blockCtx = this.block.getContext('2d');

  // 滑动按钮
  this.slideContainer = createElement('div', 'slide-container');
  this.slideMask = createElement('div', 'slide-mask');
  this.slider = createElement('div', 'slider');
  var slideIcon = createElement('div', 'slide-icon');
  this.slideText = createElement('div', 'slide-text');
  this.slideText.innerHTML = '向右拖动滑块填充拼图';
  this.slider.appendChild(slideIcon);
  this.slideMask.appendChild(this.slider);
  this.slideContainer.appendChild(this.slideMask);
  this.slideContainer.appendChild(this.slideText);

  // 塞入容器
  this.oRenderTo.appendChild(this.canvasContainer);
  this.oRenderTo.appendChild(this.slideContainer);

  // bind
  this.bindEvent();
  this.initImage();
};
SlideVerify.prototype.initImage = function () {
  const _this = this;
  this.img = new Image();
  this.img.crossOrigin = 'Anonymous';
  this.img.src = this.dataSource;
  this.img.onload = function (e) {
    _this.draw();
  };
  _this.setLoading(false);
};
SlideVerify.prototype.draw = function () {
  const { width, height } = this;
  this.x = getRandomNumberByRange(L + 10, width - (L + 10));
  this.y = getRandomNumberByRange(10 + L, height - (L + 10));

  //随机位置创建拼图形状
  drawPath(this.canvasCtx, this.x, this.y, 'fill');
  drawPath(this.blockCtx, this.x, this.y, 'clip');

  // 画入图片
  this.canvasCtx.drawImage(this.img, 0, 0, width, height);
  this.blockCtx.drawImage(this.img, 0, 0, width, height);

  // 提取滑块放入最左边
  const y = this.y - r * 2;
  const imageData = this.blockCtx.getImageData(this.x, y, L, L);
  this.block.width = L;
  this.blockCtx.putImageData(imageData, 0, y);
};
// 绑定事件
SlideVerify.prototype.bindEvent = function () {
  var _this = this;
  this.refreshIcon.onclick = function () {
    _this.reset();
  };
  this.dragEvent();
  this.setCaptchaMode();
};
SlideVerify.prototype.setCaptchaMode = function () {
  var _this = this;
  var handlerMouseUp = function (e) {
    _this.isEntry = true;
    _this.canvasContainer.style.display = 'block';
    setTimeout(() => {
      _this.canvasContainer.style.opacity = '1';
      let top = -_this.height - 15;
      _this.canvasContainer.style.top = top + 'px';
    }, 200);
  };
  var handlerMouseLeave = function (e) {
    _this.isEntry = false;
    _this.canvasContainer.style.top = `-${this.height}px`;
    setTimeout(() => {
      _this.canvasContainer.style.opacity = '0';
      _this.canvasContainer.style.display = 'none';
    }, 200);
  };
  if (this.captchaMode === 'float') {
    this.canvasContainer.style.position = 'absolute';
    if (_this.isEntry) {
      _this.canvasContainer.style.display = 'block';
      _this.canvasContainer.style.opacity = '1';
      let top = -_this.height - 15;
      _this.canvasContainer.style.top = `${top}px`;
    } else {
      _this.canvasContainer.style.display = 'none';
      _this.canvasContainer.style.opacity = '0';
      _this.canvasContainer.style.top = `-${this.height}px`;
    }

    this.slideContainer.addEventListener('mouseenter', handlerMouseUp);
    this.slideContainer.addEventListener('mouseleave', handlerMouseLeave);
  }
};

SlideVerify.prototype.setLoading = function (isLoading) {
  this.loading.style.display = isLoading ? '' : 'none';
  // this.slideContainer.style.pointerEvents = isLoading ? 'none' : '';
};

SlideVerify.prototype.dragEvent = function () {
  const _this = this;
  var handlerDragStart = function (e) {
    e.preventDefault();
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove, true);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd, true);
    setClass(_this.slideContainer, 'slide-container');
    const eventX = e.screenX;
    _this.originX = eventX;
    console.log(e, _this.originX, 'dragStart');
  };

  this.moveX = 0;
  var handleDragMove = function (e) {
    _this.moveX = e.screenX - _this.originX;
    if (_this.moveX < 0 || _this.moveX + 58 >= _this.width) return false;
    addClass(_this.slideContainer, 'slide-container-active');
    _this.block.style.left = _this.moveX + 'px';
    _this.slider.style.left = _this.moveX + 'px';
    _this.slideMask.style.width = _this.moveX + 'px';
    console.log(e, _this.moveX, 'dragMove');
  };
  var verify = function () {
    let isFinished = Math.abs(_this.moveX - _this.x) < 10;
    return isFinished;
  };
  var handleDragEnd = function (e) {
    let isMoved = _this.originX < _this.moveX + _this.originX;
    console.log(isMoved, '');
    removeClass(_this.slideContainer, 'slide-container-active');
    if (_this.slideContainer && isMoved) {
      if (verify()) {
        addClass(_this.slideContainer, 'slide-container-success');
        _this.onSucess();
      } else {
        addClass(_this.slideContainer, 'slide-container-fail');
        setTimeout(() => _this.reset(), 1000);
      }
    }
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchend', handleDragEnd);
  };
  this.block.addEventListener('mousedown', handlerDragStart);
  this.block.addEventListener('touchstart', handlerDragStart);
  this.slider.addEventListener('mousedown', handlerDragStart);
  this.slider.addEventListener('touchstart', handlerDragStart);
};
/**
 * 重新加载验证码
 */
SlideVerify.prototype.reset = function () {
  const { width, height } = this;
  setClass(this.slideContainer, 'slide-container');
  this.block.style.left = 0 + 'px';
  this.slider.style.left = 0 + 'px';
  this.slideMask.style.width = 0 + 'px';

  this.canvasCtx.clearRect(0, 0, width, height);
  this.blockCtx.clearRect(0, 0, width, height);

  this.setLoading(true);
  this.byData();
};

function getRandomImgSrc() {
  return `https://picsum.photos/id/${getRandomNumberByRange(0, 1084)}/${w}/${h}`;
}

function sum(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}

function createElement(tagName, className) {
  const element = document.createElement(tagName);
  className && setClass(element, className);
  return element;
}

function createCanvas(width, height) {
  const element = document.createElement('canvas');
  element.width = width;
  element.height = height;
  return element;
}

function setClass(element, className) {
  element.className = className;
}

function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function setSize(element, width, height) {
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
}

/**
 * 获取随机数
 * @param {*} start
 * @param {*} end
 */
function getRandomNumberByRange(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}

/**
 * 抠图
 * @param {canvas} ctx
 * @param {坐标} x
 * @param {坐标} y
 * @param {填充，裁剪} operation fill clip
 */
function drawPath(ctx, x, y, operation) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0.7 * PI, PI * 2.3);
  ctx.lineTo(x + l, y);
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.2 * PI, 2.8 * PI);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  ctx.arc(x, y + l / 2, r + 1, 0.5 * PI, 1.5 * PI, true);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(255, 255, 255,0.7)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.stroke();
  ctx.globalCompositeOperation = 'destination-over';
  operation === 'fill' ? ctx.fill() : ctx.clip();
}

export default SlideVerify;
