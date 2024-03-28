import React, { createContext } from 'react';
import ContextDemo from './Context';
import ReduxDemo from './Redux';
import ZustandDemo from './ZuStand';
import JotaiDemo from './Jotai';
import ReContext from './TestContext/ReContext';
import NoReContext from './TestContext/NoReContext';
import useDrawerStore from './ZuStand/Store';

const { Provider } = createContext({
  // 测试zustand 修改 provider 2次渲染问题
  testZustand: false
});

interface Props {}
const Store: React.FC<Props> = () => {
  const { drawer } = useDrawerStore((state: any) => state);

  return (
    <>
      <ContextDemo />
      <ReduxDemo />
      <Provider value={{ testZustand: drawer }}>
        <ZustandDemo />
      </Provider>
      <JotaiDemo />
      <ReContext />
      <NoReContext />
    </>
  );
};
export default Store;
