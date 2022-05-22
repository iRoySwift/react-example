const addItem = {
  queue: true, // 是否加入执行栈
  enable() {
    return true;
  },
  execute(e) {
    const { itemType, model } = e;
    const item = (this as any).graph.addItem(itemType, model, this.queue);
    return item;
  },
  back() {}
};

export default addItem;
