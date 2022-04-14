import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../Button';

export const TopBarPanel = styled.div`
  width: 100%;
  height: 60px;
  background-color: #20232a;
  position: fixed;
  overflow: visible;
  z-index: 10;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 100px;
  padding-right: 100px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1440px) {
    padding: 0px 100px;
    height: 60px;
  }

  @media (max-width: 1200px) {
    padding: 0px 45px;
    height: 50px;
  }

  @media (max-width: 750px) {
    padding: 0px 18px;
    height: 40px;
  }
`;

export const TopBarLogoPanel = styled(Link)`
  display: flex;
  align-items: center;
  color: #61dafb;
  height: 100%;
  margin-right: 10px;
  @media (min-width: 750px) {
    width: calc(100% / 6);
  }

  > img {
    width: 20px;
    height: 20px;
  }
  span {
    margin-left: 10px;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    @media (max-width: 1200px) {
      font-size: 16px;
      margin-top: 1px;
    }
    @media (max-width: 750px) {
      position: absolute;
      overflow: hidden;
      clip: rect(0 0 0 0);
      height: 1px;
      width: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
    }
    /* @media (max-width: 1440px) {
      font-size: 16px;
    }
    @media (max-width: 1200px) {
      font-size: 16px;
    }

    @media (max-width: 750px) {
      font-size: 16px;
    } */
  }
`;

export const HeaderEmptyPanel = styled.div`
  flex: 1;
`;

export const MobileMenuIconCompPanel = styled(Button)`
  .menu__icon__first,
  .menu__icon__second,
  .menu__icon__third {
    width: 18px;
    height: 2px;
    background-color: white;
    margin: 5px 0;
    transition: 0.4s;
  }
  .close {
    .menu__icon__first {
      transform: rotate(-45deg) translate(-5px, 5px);
    }
    .menu__icon__second {
      opacity: 0;
    }
    .menu__icon__third {
      transform: rotate(45deg) translate(-5px, -5px);
    }
  }
`;
