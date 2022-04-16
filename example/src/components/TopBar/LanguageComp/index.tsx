import React, { useLayoutEffect, useState } from 'react';
import { LanguageCompPanel, LanguageMobileCompPanel, LanguageMobileMenuItem } from './styled';
import Button from '@/components/Button/index';
import DropDown from './../../DropDown/index';
import i18n, { changeLanguage, currentLanguage } from '@/utils/i18n';
import { isMobile } from '@/utils/screen';
import { MobileMenuItem } from '../MenusComp/styled';
import { useDispatch } from '@/store/providers';
import { AppActions, ComponentsActions } from '@/store/actions';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '@/store/reducers';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTheme } from '@mui/material';

const GetDropdownIcon = (showLanguage: boolean) => {
  const theme = useTheme();
  if (!showLanguage) return <ArrowBackIosIcon sx={{ color: theme.palette.text.primary, fontSize: '12px', transform: 'rotate(-90deg) translate(2px, 0px)' }} />;
  return <ArrowBackIosIcon sx={{ color: theme.palette.text.primary, fontSize: '12px', transform: 'rotate(90deg) translate(2px, 0px)' }} />;
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
          {GetDropdownIcon(showSubMenu)}
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
  const [showLanguage, setShowLanguage] = useState(true);
  const [languageLeft, setLanguageLeft] = useState(0);
  const [languageTop, setLanguageTop] = useState(0);

  useLayoutEffect(() => {
    if (showLanguage) {
      const languageBoxRef = document.getElementById('header__language__panel');
      const languageBoxRect = languageBoxRef?.getBoundingClientRect();
      if (languageBoxRect) {
        const { bottom, right, left } = languageBoxRect;
        console.log(bottom, right, left);
        setLanguageLeft(right);
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
          <span style={{ marginRight: '5px' }}>{languageText(currentLanguage())}</span>
          {GetDropdownIcon(showLanguage)}
        </div>
      </Button>
      {showLanguage && <DropDown setShow={setShowLanguage} left={languageLeft} top={languageTop} />}
    </LanguageCompPanel>
  );
};
export default () => {
  return isMobile() ? <LanguageMobileComp /> : <LanguageComp />;
};
