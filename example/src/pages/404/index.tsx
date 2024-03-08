import React from 'react';
import { styled } from '@mui/material/styles';
import Mobile404Image from '@/assets/404/mobile_404.png';

interface Props {}

export const NoFoundPanel = styled('div')`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  > a {
    color: #61dafb;
  }
`;

const NotFoundImage = styled('img')`
  width: 1038px;
  height: 480px;
  margin: 0 auto;
  display: block;
  @media (max-width: 750px) {
    width: 282px;
    height: 130px;
  }
`;
const NotFoundPage: React.FC<Props> = () => {
  return (
    <NoFoundPanel>
      <NotFoundImage src={Mobile404Image}></NotFoundImage>
    </NoFoundPanel>
  );
};
export default NotFoundPage;
