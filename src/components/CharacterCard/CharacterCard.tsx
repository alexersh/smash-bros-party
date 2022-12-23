import Image from 'next/image';
import { Button, Card } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { TCharacter } from '../../constants/characters';
import styles from './CharacterCard.module.scss';
import { useStores } from '../StoreProvider/StoreProvider';
import uniqid from 'uniqid';

interface ICharacterCardProps {
  character: TCharacter;
}

const CharacterCard: React.FC<ICharacterCardProps> = observer(({ character }) => {
  const {
    store: { setAvatar, setCurrentStep, createUser, name, wish },
  } = useStores();

  const onClick = () => {
    setAvatar(character.portrait);
    createUser({
      name,
      wish,
      avatar: character.portrait,
      character: character.name,
      score: 0,
      id: uniqid(),
    });
    setCurrentStep(null);
    typeof window !== 'undefined' && window.localStorage.setItem('character', character.name);
  };

  return (
    <Card className={styles.card}>
      <Image
        draggable="false"
        className={styles.portrait}
        width="500"
        height="500"
        src={character.portrait}
        alt={character.name}
      />
      <Card.Body className={styles.body}>
        <Card.Text as="h4">{character.name}</Card.Text>
        <Button className={styles.btn} variant="primary" onClick={onClick}>
          Очевидно мой выбор!
        </Button>
      </Card.Body>
    </Card>
  );
});

export default CharacterCard;
