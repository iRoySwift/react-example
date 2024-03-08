import React from 'react';
import ContextDemo from './Context';
import ReduxDemo from './Redux';
import ZustandDemo from './ZuStand';
import JotaiDemo from './Jotai';

interface Props {}
const Store: React.FC<Props> = () => {
  return (
    <div>
      <ContextDemo />
      <ReduxDemo />
      <ZustandDemo />
      <JotaiDemo />
    </div>
  );
};
export default Store;
