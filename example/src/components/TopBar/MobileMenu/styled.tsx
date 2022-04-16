import { styled } from '@mui/material/styles';

export const MobileMenuPanel = styled('div')`
  width: 100%;
  background: ${({ theme }) => (theme.palette.mode == 'dark' ? theme.palette.background.topBar : '#fff')};
  overflow: hidden;
  position: fixed;
  top: 40px;
  bottom: 0px;
  z-index: 2;
  color: ${({ theme }) => theme.palette.text.primary};
`;
