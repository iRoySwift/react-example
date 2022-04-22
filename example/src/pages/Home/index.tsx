import { useTranslation } from 'react-i18next';
import Content from '@/components/Content/index';
import { HomePanel, LogoImage } from './styled';
import logo from '@/logo.svg';
import Page from '@/components/Page/index';

const Home = () => {
  const { t } = useTranslation();
  console.log(process.env);
  return (
    <Page>
      <Content>
        <HomePanel>
          <LogoImage src={logo} alt="logo" />
          {process.env.REACT_APP_TITLE}
          <br />
          {process.env.NODE_ENV}
          <p>
            {t('home.edit')} <code>src/App.tsx</code> {t('home.andSaveToReload')}
          </p>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            {t('home.learn')} React
          </a>
        </HomePanel>
      </Content>
    </Page>
  );
};
export default Home;
