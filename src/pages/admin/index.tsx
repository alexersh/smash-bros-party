import { collection } from '@firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { useLayoutEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import AdminLogin from '../../components/AdminLogin/AdminLogin';
import { IUser, useStores } from '../../components/StoreProvider/StoreProvider';
import styles from './AdminPage.module.scss';

const AdminPage: React.FC = observer(() => {
  const {
    store: { setUsersChange, db, sortedUsers, isAdminLogged, changeScore },
  } = useStores();

  useLayoutEffect(() => {
    const collectionRef = collection(db, 'users');

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      console.log('>>> new data recieved');

      setUsersChange(snapshot.docs.map((doc) => doc.data() as IUser));
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {!isAdminLogged ? (
        <AdminLogin />
      ) : (
        <div className={styles.usersTable}>
          {sortedUsers.map((user, i) => {
            return (
              <div key={user.character} className={styles.userRow}>
                <div className={styles.row}>
                  <div className={styles.index}>{i + 1}</div>
                  <span className={styles.name}>{user.name}</span>
                  <Image
                    alt={user.character}
                    className={styles.userImg}
                    width={100}
                    height={100}
                    src={user.avatar}
                  />
                  <span className={styles.character}>{user.character}</span>
                  <div className={styles.score}>{user.score}</div>
                </div>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      changeScore(1, user.id);
                    }}
                    size="lg"
                    variant="primary"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => {
                      changeScore(-1, user.id);
                    }}
                    size="lg"
                    variant="secondary"
                  >
                    -
                  </Button>
                </ButtonGroup>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default AdminPage;
