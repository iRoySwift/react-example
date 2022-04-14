import React from 'react';
import LanguageComp from '../LanguageComp';
import MenusComp from '../MenusComp';
import { MobileMenuPanel } from './styled';

interface Props {}
const MobileMenu: React.FC<Props> = () => {
  return (
    <MobileMenuPanel>
      <MenusComp />
      <LanguageComp />
    </MobileMenuPanel>
  );
};
export default MobileMenu;
