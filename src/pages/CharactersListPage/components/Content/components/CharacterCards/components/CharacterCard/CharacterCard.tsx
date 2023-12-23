import { memo, FC, useMemo } from 'react';

// Components
import { Card } from 'src/components';

// Libs
import { Link } from 'react-router-dom';

// Misc
import { getUrlId } from 'src/utils/getUrlId';

// Type definitions
import { Character } from 'src/types/Character.type';

interface CharacterCardProps {
  imageSrc: string
  details: Character
}

const CharacterCard: FC<CharacterCardProps> = ({ imageSrc, details }) => {
  const { url, name } = details;
  const id = getUrlId(url);

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
