import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';
import { IUser } from '../../StoreProvider/StoreProvider';
import styles from './UserCards.module.scss';

interface IUserCard {
  user: IUser;
}

const UserCard: React.FC<IUserCard> = ({ user }) => {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    if (user.score === 36) {
      setShow(true);

      setTimeout(() => setShow(false), 10000);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <span className={styles.name}>{user.name}</span>
      <div className={`${styles.user} ${styles[user.character.split(' ').join('')]}`}></div>
      <span className={styles.score}>{user.score}</span>

      {show && (
        <div className={styles.fanfares}>
          <div>{user.name}, поздравляем! </div>
          <div>Теперь ТЫ пьяненький!</div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
