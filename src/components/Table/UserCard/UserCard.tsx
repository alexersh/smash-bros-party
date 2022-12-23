import Image from 'next/image';
import { IUser } from '../../StoreProvider/StoreProvider';
import styles from './UserCards.module.scss';

interface IUserCard {
  user: IUser;
}

const UserCard: React.FC<IUserCard> = ({ user }) => {
  return (
    <div className={styles.container}>
      <span className={styles.name}>{user.name}</span>
      <div className={`${styles.user} ${styles[user.character.split(' ').join('')]}`}></div>
      <span className={styles.score}>{user.score}</span>
    </div>
  );
};

export default UserCard;
