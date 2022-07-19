import { isObject } from 'lodash';

export default class Message {
  containerEl;
  constructor() {
    const containerId = 'message-container';
    this.containerEl = document.getElementById(containerId);
    if (!this.containerEl) {
      this.containerEl = document.createElement('div');
      this.containerEl.id = containerId;
      document.body.appendChild(this.containerEl);
    }
  }
  info(ctx) {
    this.show({ type: 'icon-info bi-exclamation-circle-fill', ctx });
  }
  success(ctx) {
    this.show({ type: 'icon-success bi-check-circle-fill', ctx });
  }
  error(ctx) {
    this.show({ type: 'icon-error bi-x-circle-fill', ctx });
  }
  warning(ctx) {
    this.show({ type: 'icon-warning bi-exclamation-circle-fill', ctx });
  }
  loading(ctx) {
    this.show({ type: 'icon-loading bi-arrow-clockwise', ctx });
  }
  show({ type, ctx }) {
    console.log(isObject(ctx));
    let content = '',
      duration = 2000,
      closeable = false;
    if (isObject(ctx)) {
      // let { content, duration, closeable } = ctx;
      content = ctx.content;
      duration = ctx.duration;
      closeable = ctx.closeable;
    } else {
      content = ctx;
    }
    let messageEl = document.createElement('div');
    messageEl.className = 'message move-in';
    messageEl.innerHTML = `
            <span class="bi ${type}"></span>
            <div class="text">${content}</div>
        `;
    // 是否展示关闭按钮
    if (closeable) {
      let closeEl = document.createElement('div');
      closeEl.className = 'close bi bi-x-lg';
      messageEl.appendChild(closeEl);
      closeEl.addEventListener('click', () => {
        this.close(messageEl);
      });
    }
    this.containerEl.appendChild(messageEl);
    // 只有当duration大于0的时候才设置定时器，这样我们的消息就会一直显示
    if (duration > 0) {
      setTimeout(() => {
        this.close(messageEl);
      }, duration);
    }
  }

  /**
   * 关闭某个消息
   * 由于定时器里边要移除消息，然后用户手动关闭事件也要移除消息，所以我们直接把移除消息提取出来封装成一个方法
   * @param {Element} messageEl
   */
  close(messageEl) {
    // 首先把move-in这个弹出动画类给移除掉，要不然会有问题，可以自己测试下
    messageEl.className = messageEl.className.replace('move-in', '');
    // 增加一个move-out类
    messageEl.className += 'move-out';

    // move-out动画结束后把元素的高度和边距都设置为0
    // 由于我们在css中设置了transition属性，所以会有一个过渡动画
    messageEl.addEventListener('animationend', () => {
      messageEl.setAttribute('style', 'height:0;margin:0');
    });

    // 这个地方是监听动画结束事件，在动画结束后把消息从dom树中移除。
    // 如果你是在增加move-out后直接调用messageEl.remove，那么你不会看到任何动画效果
    messageEl.addEventListener('transitionend', () => {
      // Element对象内部有一个remove方法，调用之后可以将该元素从dom树种移除！
      messageEl.remove();
    });
  }
}
