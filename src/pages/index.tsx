import Login from '../components/Login/Login';
import { IUser, useStores } from '../components/StoreProvider/StoreProvider';
import { observer } from 'mobx-react';
import styles from '../styles/Home.module.scss';
import Table from '../components/Table/Table';
import Head from 'next/head';
import Marquee from 'react-fast-marquee';
import localFont from '@next/font/local';
import { useLayoutEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

const myFont = localFont({ src: '../../public/Oswald-VariableFont_wght.ttf' });

const Home = observer(() => {
  const {
    store: { isLoggedIn, allWishes, db, setUsersChange },
  } = useStores();
  const [isLogged, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    const collectionRef = collection(db, 'users');

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      console.log('>>> new data recieved');

      setUsersChange(snapshot.docs.map((doc) => doc.data() as IUser));
    });

    setIsLoggedIn(isLoggedIn);

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.container} ${myFont.className}`}>
      <Head>
        <title>Super December Party</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Login />
      {isLogged && (
        <>
          <Marquee speed={50} gradientWidth={0} className={styles.wishes}>
            {allWishes.join('; ')}
          </Marquee>
          <Table />
        </>
      )}
    </div>
  );
});

export default Home;
