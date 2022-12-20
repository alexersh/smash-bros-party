import { observer } from 'mobx-react';
import { useStores } from '../StoreProvider/StoreProvider';
import styles from './Table.module.scss';

const Table = observer(() => {
  const { store } = useStores();

  return (
    <div className={styles.container}>
      <div className={styles.row}>1</div>
      <div className={styles.row}>1</div>
      <div className={styles.row}>1</div>
      <div className={styles.row}>1</div>
      <div className={styles.row}>1</div>
    </div>
  );
});

export default Table;
