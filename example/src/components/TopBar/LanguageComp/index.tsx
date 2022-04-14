import React, { useLayoutEffect, useState } from 'react';
import { LanguageCompPanel, LanguageMobileCompPanel, LanguageMobileMenuItem } from './styled';
import Button from '@/components/Button/index';
import DropDown from './../../DropDown/index';
import WhiteDropdownIcon from '@/assets/white_dropdown.png';
import WhiteDropUpIcon from '@/assets/white_drop_up.png';
import GreenDropUpIcon from '@/assets/green_drop_up.png';
import i18n, { changeLanguage, currentLanguage } from '@/utils/i18n';
import { isMobile } from '@/utils/screen';
import { MobileMenuItem } from '../MenusComp/styled';
import { useDispatch } from '@/store/providers';
import { AppActions, ComponentsActions } from '@/store/actions';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '@/store/reducers';

const getDropdownIcon = (showLanguage: boolean) => {
  if (!showLanguage) return WhiteDropdownIcon;
  return GreenDropUpIcon;
};

export const hideMibleMenu = (dispatch: AppDispatch) => {
  dispatch({
    type: ComponentsActions.UpdateHeaderMobileMenuVisible,
    payload: {
      mobileMenuVisible: false
    }
  });
};

// 改变语言
export const handleLanguage = (dispatch: AppDispatch) => {
  const language = currentLanguage() === 'en' ? 'zh' : 'en';
  changeLanguage(language);
  dispatch({
    type: AppActions.UpdateAppLanguage,
    payload: {
      language
    }
  });
};

export const languageText = (lan: 'en' | 'zh' | null, reverse?: boolean) => {
  if (reverse) {
    return lan === 'zh' ? i18n.t('navBar.language_en') : i18n.t('navBar.language_zh');
  }
  return lan === 'en' ? i18n.t('navBar.language_en') : i18n.t('navBar.language_zh');
};

const LanguageMobileComp = () => {
  const [showSubMenu, setShowSubMenu] = useState<any>(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <LanguageMobileCompPanel>
      <MobileMenuItem>
        <Button
          className="mobile_menu_button"
          onClick={() => {
            setShowSubMenu(!showSubMenu);
          }}>
          <div className="mobile_menu_text">{languageText(currentLanguage())}</div>
          <img className="mobile_menu_icon" src={!showSubMenu ? WhiteDropdownIcon : WhiteDropUpIcon} alt="dropdown icon" />
        </Button>
      </MobileMenuItem>
      {showSubMenu && (
        <div>
          <LanguageMobileMenuItem>
            <Button
              className="mobile_menu_button"
              onClick={() => {
                hideMibleMenu(dispatch);
              }}>
              <div className="mobile_menu_text">{currentLanguage() === 'en' ? t('navBar.language_en') : t('navBar.language_zh')}</div>
            </Button>
          </LanguageMobileMenuItem>
          <LanguageMobileMenuItem>
            <Button
              className="mobile_menu_button"
              onClick={() => {
                handleLanguage(dispatch);
                hideMibleMenu(dispatch);
              }}>
              <div className="mobile_menu_text">{currentLanguage() !== 'en' ? t('navBar.language_en') : t('navBar.language_zh')}</div>
            </Button>
          </LanguageMobileMenuItem>
        </div>
      )}
    </LanguageMobileCompPanel>
  );
};

interface Props {}
const LanguageComp: React.FC<Props> = () => {
  const [showLanguage, setShowLanguage] = useState(false);
  const [languageLeft, setLanguageLeft] = useState(0);
  const [languageTop, setLanguageTop] = useState(0);

  useLayoutEffect(() => {
    if (showLanguage) {
      const languageBoxRef = document.getElementById('header__language__panel');
      const languageBoxRect = languageBoxRef?.getBoundingClientRect();
      if (languageBoxRect) {
        const { bottom, left, width } = languageBoxRect;
        setLanguageLeft(left - width / 2);
        setLanguageTop(bottom);
      }
    }
  }, [showLanguage]);
  return (
    <LanguageCompPanel
      id="header__language__panel"
      showLanguage={showLanguage}
      onMouseLeave={() => {
        setShowLanguage(false);
      }}>
      <Button
        className="header_language_flag"
        onMouseOver={() => {
          setShowLanguage(true);
        }}>
        <div className="header_language_content_panel">
          <div>{languageText(currentLanguage())}</div>
          <img src={getDropdownIcon(showLanguage)} alt="dropdown icon" />
        </div>
      </Button>
      {showLanguage && <DropDown setShow={setShowLanguage} left={languageLeft} top={languageTop} />}
    </LanguageCompPanel>
  );
};
export default () => {
  return isMobile() ? <LanguageMobileComp /> : <LanguageComp />;
};
