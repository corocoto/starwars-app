import { FC } from 'react';

// Styles
import styles from './CharacterCards.module.css';


// Type definitions
import { CharactersState } from 'src/store/slices/Characters/Characters.types';

// Components
import CharacterCardWrapper from '../CharacterCardWrapper';

interface CharacterCardsProps {
  characters: CharactersState['data'];
}

const CharacterCards: FC<CharacterCardsProps> = ({ characters }) => {
  return (
    <div className={styles.wrapper}>
      {characters.map(character => (
        <CharacterCardWrapper key={character.name} character={character} />
      ))}
    </div>
  );
};

export default CharacterCards;
