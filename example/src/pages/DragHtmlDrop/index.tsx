import React from 'react';
import './index.css';

interface Props {}
const App: React.FC<Props> = () => {
  const onDragStart = (e: any): void => {
    // e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.setData('Text', e.target.id);
  };

  // const onDrag = (e: React.DragEvent<HTMLSpanElement>): void => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   e.persist();
  // };

  // const onDragEnd = (e: React.DragEvent<HTMLSpanElement>): void => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };

  // const onDragEnter = (e: React.DragEvent<HTMLDivElement>): any => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };

  const onDragOver = (e: any): any => {
    e.preventDefault();
    e.stopPropagation();
    e.persist();
    // @ts-ignore
    const data = e.dataTransfer.getData('service');
  };

  // const onDragLeave = (e: React.DragEvent<HTMLDivElement>): any => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };

  const onDrop = (e: any): any => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    const pattern1 = /^box/;
    const data = e.dataTransfer.getData('Text');
    if (pattern1.test(e.target.id)) {
      e.target.appendChild(document.getElementById(data));
      e.preventDefault();
    }
  };
  return (
    <div>
      <div id="box1" onDragOver={onDragOver} onDrop={onDrop}>
        <div id="item1" draggable="true" onDragStart={onDragStart}>
          item1
        </div>
        <div id="item2" draggable="true" onDragStart={onDragStart}>
          item2
        </div>
        <div id="item3" draggable="true" onDragStart={onDragStart}>
          item3
        </div>
      </div>
      <div id="box2" onDragOver={onDragOver} onDrop={onDrop}>
        <div id="item4" draggable="true" onDragStart={onDragStart}>
          item4
        </div>
      </div>
      <div id="box3" onDragOver={onDragOver} onDrop={onDrop}></div>
    </div>
  );
};
export default App;
