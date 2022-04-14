import { useAppState } from '@/store/providers';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import MobileMenu from '../TopBar/MobileMenu';

interface Props {
  children?: ReactNode;
  style?: any;
}

const ContentPanel = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
`;
const Content: React.FC<Props> = ({ children, style }) => {
  const {
    components: { mobileMenuVisible }
  } = useAppState();

  return <ContentPanel style={style}>{mobileMenuVisible ? <MobileMenu /> : children}</ContentPanel>;
};
export default Content;
