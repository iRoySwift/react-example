import { Box, styled } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import Shell from './Shell';
import TerminalIcon from '@mui/icons-material/Terminal';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { boundingRect, screenRect } from '@/utils/position';
interface Props {}

const Container = styled(Box)`
  display: grid;
  height: var(--vm-height);
  grid-area: xterm;
  grid-template-areas:
    'tabs'
    'body';
  grid-template-rows: 33px auto;
`;

const Tabs = styled('div')`
  grid-area: tabs;
  display: flex;
  flex: 1;
  background: rgb(220, 222, 231);
  color: #333;
  font-size: 14px;
  align-items: end;
  border-bottom: 3px solid rgb(244, 245, 250);
  .tab {
    display: flex;
    cursor: pointer;
    background-color: rgb(244, 245, 250);
    outline: 1px solid rgb(244, 245, 250);
    border-top: 1px solid rgb(220, 222, 231);
    border-right: 1px solid rgb(220, 222, 231);
    align-items: center;
    padding: 5px 10px;
    box-sizing: border-box;
    height: 27px;
    line-height: 27px;
    height: 29px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .resizer {
    cursor: ns-resize;
    width: 29px;
    height: 30px;
    padding: 0 5px;
    margin: 0 0 0 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #fff;
    }
  }
`;
const Content = styled('div')`
  grid-area: body;
  background-color: #fff;
`;

const Xterm: React.FC<Props> = () => {
  const dragOffset = useRef(0);

  const setVmHeight = (height) => {
    document.documentElement.style.setProperty('--wm-height', `${height}px`);
  };

  const dragStart = useCallback((e: any) => {
    e.preventDefault();
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('touchmove', dragMove, true);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mouseleave', dragEnd);
    document.addEventListener('touchend touchcancel', dragEnd, true);
    document.addEventListener('touchstart', dragEnd, true);
    const eventY = e.screenY;
    const rect = boundingRect(e.target);
    const offset = eventY - rect.top;
    dragOffset.current = offset;
  }, []);

  const dragMove = (e: any) => {
    const screen = screenRect();
    const min = 50;
    const max = Math.round((3 * screen.height) / 4);
    let neu = screen.height - e.screenY + dragOffset.current;
    neu = Math.max(min, Math.min(max, neu));
    setVmHeight(neu);
  };

  const dragEnd = () => {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove, true);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('mouseleave', dragEnd);
    document.removeEventListener('touchend touchcancel', dragEnd, true);
    document.removeEventListener('touchstart', dragEnd, true);
  };

  return (
    <Container>
      <Tabs className="tabs">
        <div className="tab">
          <TerminalIcon sx={{ fontSize: 16, marginRight: 1 }} />
          <span>itaas-nginx-sit-6f9d98f86c-gl7mz</span>
          <CancelPresentationIcon sx={{ fontSize: 16, marginLeft: 1 }} />
        </div>
        <div className="resizer" onMouseDown={dragStart} onTouchStart={dragStart}>
          <UnfoldMoreIcon sx={{ fontSize: 16 }} />
        </div>
      </Tabs>
      <Content className="body">
        <Shell dragOffset={dragOffset.current} />
      </Content>
    </Container>
  );
};
export default Xterm;
