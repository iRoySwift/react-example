import { Suspense } from 'react';
import TopBar from '@/components/TopBar/index';
import { PagePanel } from './styled';

const Page = ({ children, style }: { children: any; style?: object }) => {
  return (
    <PagePanel style={style}>
      <TopBar />
      <Suspense fallback="">{children}</Suspense>
    </PagePanel>
  );
};

export default Page;
