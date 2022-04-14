import React from 'react';
import styled from 'styled-components';
import Mobile404Image from '@/assets/404/mobile_404.png';
import Content from '@/components/Content';
import Page from '@/components/Page';

interface Props {}

export const NoFoundPanel = styled.div`
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

const NotFoundImage = styled.img`
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
    <Page>
      <Content>
        <NoFoundPanel>
          <NotFoundImage src={Mobile404Image}></NotFoundImage>
        </NoFoundPanel>
      </Content>
    </Page>
  );
};
export default NotFoundPage;
