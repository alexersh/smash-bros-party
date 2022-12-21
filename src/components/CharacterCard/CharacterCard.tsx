import Image from 'next/image';
import { Button, Card } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { TCharacter } from '../../constants/characters';
import styles from './CharacterCard.module.scss';
import { useStores } from '../StoreProvider/StoreProvider';

interface ICharacterCardProps {
  character: TCharacter;
}

const CharacterCard: React.FC<ICharacterCardProps> = observer(({ character }) => {
  const {
    store: { setAvatar, setCurrentStep, createUser, name, wish },
  } = useStores();

  const onClick = () => {
    setAvatar(character.portrait);
    createUser({ name, wish, character: character.name, avatar: character.portrait, score: 0 });
    setCurrentStep(null);
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
        <Button variant="primary" onClick={onClick}>
          Очевидно мой выбор
        </Button>
      </Card.Body>
    </Card>
  );
});

export default CharacterCard;
