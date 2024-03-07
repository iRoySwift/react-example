import Amap from '@/components/Map/Amap';
import React from 'react';

interface Props {}
const AmapPage: React.FC<Props> = () => {
  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <Amap />
    </div>
  );
};
export default AmapPage;
