import { Modal } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { characters } from '../../../constants/characters';
import CharacterCard from '../../CharacterCard/CharacterCard';
import { useStores } from '../../StoreProvider/StoreProvider';
import styles from './SecondStep.module.scss';

const SecondStep = observer(() => {
  const {
    store: { currentStep, filteredCharacters },
  } = useStores();

  console.log(
    characters.map((character) => {
      return { name: character.name.split(' ').join(''), n: character.name };
    })
  );

  return (
    <Modal show={currentStep === '2'}>
      <Modal.Header>
        <Modal.Title>Теперь выбери себе аватар</Modal.Title>
        Это последнее, обещаю :D
      </Modal.Header>
      <Modal.Body className={styles.body}>
        <div className={styles.table}>
          {filteredCharacters.map((data) => (
            <CharacterCard key={data.name} character={data} />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
});
export default SecondStep;
