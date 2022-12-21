import Login from '../components/Login/Login';
import { useStores } from '../components/StoreProvider/StoreProvider';
import { observer } from 'mobx-react';
import styles from '../styles/Home.module.scss';
import Table from '../components/Table/Table';
import Head from 'next/head';

const Home = observer(() => {
  const {
    store: { isLoggedIn },
  } = useStores();

  return (
    <div className={styles.container}>
      <Head>
        <title>Super December Party</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Login />
      {isLoggedIn && <Table />}
    </div>
  );
});

export default Home;
