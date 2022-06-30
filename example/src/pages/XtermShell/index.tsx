import React from 'react';
import Xterm from '@/components/Xterm';
import { styled } from '@mui/system';

interface Props {}

document.documentElement.style.setProperty('--wm-height', `${369}px`);

const Container = styled('div')`
  display: grid;
  flex: 1;
  grid-template-areas: 'header header' 'nav main' 'xterm xterm';
  grid-template-columns: 230px auto;
  grid-template-rows: 55px auto var(--wm-height, 0);
`;

const Header = styled('header')`
  grid-area: header;
`;

const Nav = styled('nav')`
  grid-area: nav;
  overflow-y: auto;
`;

const Main = styled('main')`
  grid-area: main;
  overflow-y: auto;
`;

const XtermShell: React.FC<Props> = () => {
  return (
    <Container>
      <Header>Header</Header>
      <Nav>Nav</Nav>
      <Main>Main</Main>
      <Xterm />
    </Container>
  );
};
export default XtermShell;
