import { observer } from 'mobx-react';
import { useStores } from '../StoreProvider/StoreProvider';
import styles from './Table.module.scss';
import UserCard from './UserCard/UserCard';

const Table = observer(() => {
  const {
    store: {
      filteredUsers: { usersHigh, usersPrehigh, usersNormal, usersPrenormal, usersLow },
    },
  } = useStores();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`${styles.tier} ${styles.high}`}>S</div>
        <div className={styles.users}>
          {usersHigh.map((user) => {
            return <UserCard key={user.character} user={user} />;
          })}
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.tier} ${styles.prehigh}`}>A</div>
        <div className={styles.users}>
          {usersPrehigh.map((user) => {
            return <UserCard key={user.character} user={user} />;
          })}
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.tier} ${styles.normal}`}>D</div>
        <div className={styles.users}>
          {usersNormal.map((user) => {
            return <UserCard key={user.character} user={user} />;
          })}
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.tier} ${styles.prenormal}`}>C</div>
        <div className={styles.users}>
          {usersPrenormal.map((user) => {
            return <UserCard key={user.character} user={user} />;
          })}
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.tier} ${styles.low}`}>D</div>
        <div className={styles.users}>
          {usersLow.map((user) => {
            return <UserCard key={user.character} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
});

export default Table;
