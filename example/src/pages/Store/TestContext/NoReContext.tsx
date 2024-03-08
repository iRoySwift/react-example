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

export default function NoReContext() {
  const [theme, setTheme] = useState({ color: 'red' });
  const [count, setCount] = useState(0);
  return (
    <div className="NoReContext">
      NoReContext
      <div>
        {count}
        <button onClick={() => setCount((v) => v + 1)}>count</button>
      </div>
      <button onClick={() => setTheme({ color: 'red' })}>红色</button>
      <button onClick={() => setTheme({ color: 'green' })}>绿色</button>
      <Theme.Provider value={theme}>
        <Con />
        <Side />
      </Theme.Provider>
    </div>
  );
}
