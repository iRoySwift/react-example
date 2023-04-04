/*
 * @Author: Roy
 * @Date: 2022-06-15 14:21:34
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-29 13:11:59
 * @Description: 请填写简介
 */
import React, { useState } from 'react';
import { styled } from '@mui/system';
import Xtable from './Xtable';
import Xterm from '@/components/Xterm';

interface Props {}

document.documentElement.style.setProperty('--vm-height', `${369}px`);

const Container = styled('div')`
  display: grid;
  flex: 1;
  grid-template-areas: 'header header' 'nav main' 'xterm xterm';
  grid-template-columns: 230px auto;
  grid-template-rows: 55px auto var(--vm-height, 0);
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
  // const xtableRef: any = useRef();
  const [list, setList] = useState<any>([]);
  const [active, setActive] = useState<number>(0);

  const getList = (row) => {
    let arr: any[] = [];
    setActive(row.pid);

    setList((preList) => {
      console.log(preList);
      let el = arr.find((item) => item.pid === row.pid);
      if (!el) {
        arr.push(row);
      }
      return preList.concat(arr);
    });
  };

  return (
    <Container>
      <Header>Header</Header>
      <Nav>Nav</Nav>
      <Main>
        <Xtable getList={getList} />
      </Main>
      <Xterm tabs={list} active={active} setActive={setActive} setList={setList} />
    </Container>
  );
};
export default XtermShell;
