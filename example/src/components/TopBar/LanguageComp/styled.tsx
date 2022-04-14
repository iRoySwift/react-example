import styled from 'styled-components';

export const LanguageCompPanel: any = styled.div`
  display: flex;
  align-items: center;
  color: ${(props: { theme: any; showLanguage: boolean }) => (props.showLanguage ? props.theme.secondary : 'white')};
  position: relative;
  .header_language_flag {
    font-size: 14px;
    padding: 10px 0;
  }
  .header_language_content_panel {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 7.9px;
      height: 4.7px;
      margin-top: 3px;
      margin-left: 8px;
    }
  }
`;

export const LanguageMobileCompPanel = styled.div`
  .mobile_menu_button {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .mobile_menu_text {
  }
  .mobile_menu_icon {
    width: 7.9px;
    height: 4.7px;
    margin-top: 3px;
    margin-left: 8px;
  }
`;

export const LanguageMobileMenuItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: regular;
  height: 22px;
  font-size: 12px;
  margin: 0 76px;
  margin-top: 22px;
  color: #fff;
`;
