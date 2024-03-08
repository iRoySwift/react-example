import { Provider, atom } from 'jotai';

const drawerAtom = atom(false);

interface Props {}
const withProvider =
  (Component): React.FC<Props> =>
  (props) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };

export default withProvider;
export { drawerAtom };
