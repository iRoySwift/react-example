import { styled } from '@mui/material/styles';

export const DropDownPanel = styled('div')`
  display: flex;
  flex-direction: column;
  width: 70px;
  height: 74px;
  background: ${({ theme }) => (theme.palette.mode == 'dark' ? theme.palette.background.topBar : '#fff')};
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  align-items: center;
  position: fixed;
  position: -webkit-fixed;
  z-index: 1000;
  color: ${({ theme }) => theme.palette.text.primary};
  right: ${(props: { left: number; top: number }) => `calc(100% - ${props.left}px)`};
  top: ${(props: { left: number; top: number }) => props.top}px;

  .language__selected {
    width: 90%;
    font-size: 12px;
    height: 33px;
    line-height: 33px;
    margin: 3px 5% 0 5%;
    padding: 0 5%;
    cursor: pointer;
    border-radius: 3px;
    &:hover {
      color: #61dafb;
    }
  }
  .language__normal {
    width: 90%;
    font-size: 12px;
    height: 33px;
    line-height: 33px;
    margin: 0px 5% 3px 5%;
    padding: 0 5%;
    cursor: pointer;
    border-radius: 3px;
    &:hover {
      color: #61dafb;
    }
  }

  .language__separate {
    width: 80%;
    height: 0.5px;
    border: solid 0.5px #c3c3c3;
    margin: 0 10%;
  }
`;
