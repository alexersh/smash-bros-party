import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useStores } from '../StoreProvider/StoreProvider';
import styles from './Table.module.scss';

const Table = observer(() => {
  const {
    store: { users },
  } = useStores();

  return (
    <div className={styles.container}>
      {/* <div className={styles.row}>
        <div className={`${styles.tier} ${styles.high}`}>High</div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.tier} ${styles.prehigh}`}>Prehigh</div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.tier} ${styles.normal}`}>Normal</div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.tier} ${styles.prenormal}`}>Prenormal</div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.tier} ${styles.low}`}>Low</div>
      </div> */}
      {users.map((d) => (
        <div key={d.character}>{d.name}</div>
      ))}
    </div>
  );
});

export default Table;
