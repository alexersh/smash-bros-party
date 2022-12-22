import Image from 'next/image';
import { IUser } from '../../StoreProvider/StoreProvider';
import styles from './UserCards.module.scss';

interface IUserCard {
  user: IUser;
}

const UserCard: React.FC<IUserCard> = ({ user }) => {
  return (
    <div className={styles.user}>
      <span>{user.name}</span>
      <div className={`${styles.icon} ${styles[user.character]}`} />
      <span>{user.score}</span>
    </div>
  );
};

export default UserCard;
