import { styled } from '@mui/material/styles';

export const TopBarMenusPanel = styled('nav')`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

export const MobileMenuItem = styled('div')`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: regular;
  height: 22px;
  margin: 0 56px;
  margin-top: 22px;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const MobileMenuLink = styled('a')`
  color: ${({ theme }) => theme.palette.text.primary};
`;
