import React from 'react';
import ContextDemo from './Context';
import ReduxDemo from './Redux';
import ZustandDemo from './ZuStand';
import JotaiDemo from './Jotai';
import ReContext from './TestContext/ReContext';
import NoReContext from './TestContext/NoReContext';

interface Props {}
const Store: React.FC<Props> = () => {
  return (
    <div>
      <ContextDemo />
      <ReduxDemo />
      <ZustandDemo />
      <JotaiDemo />
      <ReContext />
      <NoReContext />
    </div>
  );
};
export default Store;
