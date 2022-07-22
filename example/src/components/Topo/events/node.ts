import { IG6GraphEvent } from '@suning/uxcool-graphin';

function nodeClick(this, e: IG6GraphEvent) {
  console.log(this, e);
  if (this.clickLoding) {
    return;
  }
  if (!this.clickLoding) {
    this.clickLoding = true;
    setTimeout(() => {
      this.clickLoding = false;
    }, 1000);
  }
}
function nodeDrop(this, e: IG6GraphEvent) {
  console.log(this, e);
  if (this.clickLoding) {
    return;
  }
  if (!this.clickLoding) {
    this.clickLoding = true;
    setTimeout(() => {
      this.clickLoding = false;
    }, 1000);
  }
}

function nodeMouseEnter(this, e: IG6GraphEvent) {
  console.log(this, e);
  if (this.clickLoding) {
    return;
  }
  if (!this.clickLoding) {
    this.clickLoding = true;
    setTimeout(() => {
      this.clickLoding = false;
    }, 1000);
  }
}

function nodeMouseOut(this, e: IG6GraphEvent) {
  console.log(this, e);
  if (this.clickLoding) {
    return;
  }
  if (!this.clickLoding) {
    this.clickLoding = true;
    setTimeout(() => {
      this.clickLoding = false;
    }, 1000);
  }
}

export { nodeClick, nodeDrop, nodeMouseEnter, nodeMouseOut };
