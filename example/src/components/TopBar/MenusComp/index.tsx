import { isMobile } from '@/utils/screen';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MobileMenuItem, MobileMenuLink, TopBarMenusPanel } from './styled';

interface Props {}

export enum LinkType {
  Inner,
  Outer
}

type Menu = {
  type: LinkType;
  name: any;
  url: string;
};

const MenuItemLink = ({ menu }: { menu: any }) => {
  const { url, type, name } = menu;
  return (
    <MobileMenuLink href={url} key={name} target={type === LinkType.Inner ? '_self' : '_blank'}>
      {menu.name}
    </MobileMenuLink>
  );
};

const MenusComp: React.FC<Props> = () => {
  const { t } = useTranslation();
  const menuDataList = (): Menu[] => {
    return [
      {
        type: LinkType.Inner,
        name: t('navBar.home'),
        url: '/'
      }
    ];
  };
  return isMobile() ? (
    <MobileMenuItem>
      {menuDataList()
        .filter((menu) => menu.name !== undefined)
        .map((menu, i) => (
          <MenuItemLink key={i} menu={menu} />
        ))}
    </MobileMenuItem>
  ) : (
    <TopBarMenusPanel>
      {menuDataList()
        .filter((menu) => menu.name !== undefined)
        .map((menu, i) => (
          <MenuItemLink key={i} menu={menu} />
        ))}
    </TopBarMenusPanel>
  );
};
export default MenusComp;
