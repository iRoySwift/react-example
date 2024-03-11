import React, { useEffect } from 'react';
import { useDrawerState } from './Store';

interface Props {}
const Test: React.FC<Props> = () => {
  const state = useDrawerState();
  useEffect(() => {
    console.log('🚀 ~ test:', state.test);
  }, [state.test]);
  return <div>Test</div>;
};
export default Test;
