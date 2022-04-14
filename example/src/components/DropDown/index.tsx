import React from 'react';
import Button from './../Button/index';
import { DropDownPanel } from './styled';
import { currentLanguage } from '@/utils/i18n';
import { useDispatch } from '@/store/providers';
import { handleLanguage, languageText } from '../TopBar/LanguageComp';

interface Props {
  left: number;
  top: number;
  setShow: Function;
}

const DropDown: React.FC<Props> = ({ left, top, setShow }) => {
  const dispatch = useDispatch();
  // 隐藏语言
  const hideDropdown = () => {
    setShow(false);
  };
  return (
    <DropDownPanel left={left} top={top} onMouseLeave={hideDropdown}>
      <Button className="language__selected" onClick={hideDropdown}>
        {languageText(currentLanguage())}
      </Button>
      <div className="language__separate" />
      <Button
        className="language__normal"
        onClick={() => {
          handleLanguage(dispatch);
          hideDropdown();
        }}>
        {languageText(currentLanguage(), true)}
      </Button>
    </DropDownPanel>
  );
};
export default DropDown;
