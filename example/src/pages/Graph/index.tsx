import React from 'react';
import Topo from '@/components/Topo/index';
import SideBar from './sidebar/index';

interface Props {}
const Graph: React.FC<Props> = () => {
  return (
    <div>
      <SideBar />
      <Topo />
    </div>
  );
};
export default Graph;
