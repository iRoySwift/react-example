import React, { useState, memo } from 'react';

let Theme = React.createContext({ color: 'red' });

const Inner = memo(() => {
  let theme = React.useContext(Theme);
  console.log('Inner');
  return (
    <div>
      <span style={{ color: theme.color }}>文字</span>
    </div>
  );
});

const Con = () => {
  return <Inner />;
};

const Side = memo(() => {
  console.log('side');
  return (
    <>
      <span>side</span>
    </>
  );
});

export default function ReContext() {
  const [color, setColor] = useState('red');
  const [count, setCount] = useState(0);
  return (
    <div className="ReContext">
      ReContext
      <div>
        {count}
        <button onClick={() => setCount((v) => v + 1)}>count</button>
      </div>
      <button onClick={() => setColor('red')}>红色</button>
      <button onClick={() => setColor('green')}>绿色</button>
      {/* let 字面量对象 {} */}
      <Theme.Provider value={{ color }}>
        <Con />
        <Side />
      </Theme.Provider>
    </div>
  );
}
