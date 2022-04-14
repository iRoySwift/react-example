import { TopBarPanel, TopBarLogoPanel, HeaderEmptyPanel, MobileMenuIconCompPanel } from './styled';
import MenusComp from './MenusComp';
import LanguageComp from './LanguageComp';
import { isMobile } from '@/utils/screen';
import { useAppState, useDispatch } from '@/store/providers';
import { ComponentsActions } from '@/store/actions';
const LogoIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';

const LogoComp = () => {
  return (
    <TopBarLogoPanel to="/">
      <img src={LogoIcon} alt="logo" />
      {isMobile() ? '' : <span>React</span>}
    </TopBarLogoPanel>
  );
};

/**
 * 菜单按钮
 * @returns
 */
const MobileMenuIconComp = () => {
  const {
    components: { mobileMenuVisible }
  } = useAppState();
  const dispatch = useDispatch();
  return (
    <MobileMenuIconCompPanel
      onClick={() => {
        dispatch({
          type: ComponentsActions.UpdateHeaderMobileMenuVisible,
          payload: {
            mobileMenuVisible: !mobileMenuVisible
          }
        });
      }}>
      <div className={mobileMenuVisible ? 'close' : ''}>
        <div className="menu__icon__first" />
        <div className="menu__icon__second" />
        <div className="menu__icon__third" />
      </div>
    </MobileMenuIconCompPanel>
  );
};

const TopBar = () => {
  return (
    <TopBarPanel>
      <LogoComp />
      {!isMobile() && (
        <>
          <MenusComp />
          <HeaderEmptyPanel />
          <LanguageComp />
        </>
      )}

      {isMobile() && (
        <>
          <HeaderEmptyPanel />
          <MobileMenuIconComp />
        </>
      )}
    </TopBarPanel>
  );
};
export default TopBar;
