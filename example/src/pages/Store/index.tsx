import React from 'react';
import ContextDemoe from './Context';
import ReduxDemoe from './Redux';
import ZustandDemoe from './ZuStand';
import JotaiDemoe from './Jotai';

interface Props {}
const Store: React.FC<Props> = () => {
  return (
    <div>
      <ContextDemoe />
      <ReduxDemoe />
      <ZustandDemoe />
      <JotaiDemoe />
    </div>
  );
};
export default Store;
