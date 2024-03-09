import { memo, useMemo, FC } from 'react';

// Misc
import { getUrlId, getCharacterImageLink } from 'src/utils';

// Components
import { CharacterCard } from '../CharacterCards/components';

// Type definitions
import { Character } from 'src/types/Character.type';

interface CharacterCardWrapperProps {
  character: Character;
}

const CharacterCardWrapper: FC<CharacterCardWrapperProps> = props => {
  const { character } = props;

  const characterId = getUrlId(character.url);
  const imageSrc = getCharacterImageLink(characterId);

  // Memoized values
  const details = useMemo(
    () => ({
      ...character,
      id: characterId
    }),
    [character, characterId]
  );

  return <CharacterCard imageSrc={imageSrc} details={details} />;
};

CharacterCardWrapper.displayName = 'CharacterCardWrapper';

export default memo(CharacterCardWrapper);
