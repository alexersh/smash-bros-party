import { observer } from 'mobx-react';
import Marquee from 'react-fast-marquee';
import { useLayoutEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useStores, IUser } from '../../components/StoreProvider/StoreProvider';
import Table from '../../components/Table/Table';
import styles from './Tv.module.scss';

const Home = observer(() => {
  const {
    store: { allWishes, isLoggedIn, db, setUsersChange },
  } = useStores();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      const collectionRef = collection(db, 'users');

      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        console.log('>>> new data recieved');

        setUsersChange(snapshot.docs.map((doc) => doc.data() as IUser));
      });

      return () => unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className={`${styles.container}`}>
      <>
        <Marquee speed={50} gradientWidth={0} className={styles.wishes}>
          {allWishes.join('; ')}
        </Marquee>
        <Table />
      </>
    </div>
  );
});

export default Home;
