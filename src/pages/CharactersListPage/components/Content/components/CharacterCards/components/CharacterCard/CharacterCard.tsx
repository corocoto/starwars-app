import { memo, FC, useMemo } from 'react';

// Components
import { Card } from 'src/components';

// Libs
import { Link } from 'react-router-dom';

// Type definitions
import { Character } from 'src/types/Character.type';

interface CharacterCardProps {
  imageSrc: string;
  details: Character & {id: string};
}

const CharacterCard: FC<CharacterCardProps> = ({ imageSrc, details }) => {
  const { id, name } = details;

  // Memoized values
  const imageProps = useMemo(() => {
    return {
      src: imageSrc,
      alt: `${name} photo`
    };
  }, [imageSrc, name]);

  return (
    <Link to={`/characters/${id}`}>
      <Card hoverable imageProps={imageProps} title={name} />
    </Link>
  );
};

CharacterCard.displayName = 'CharacterCard';

export default memo(CharacterCard);
