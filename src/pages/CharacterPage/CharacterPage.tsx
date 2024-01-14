import { FC, useCallback, useMemo, useState } from 'react';

// Components
import { Card } from 'src/components';
import { ReadableTable, UpdateDataForm } from './components';

// Libs
import Button from 'antd/es/button';

// Styles
import styles from './CharacterPage.module.css';

// Type definition
import { Character } from 'src/types/Character.type';

// Misc
import { getCharacterImageLink } from 'src/utils';

export interface CharacterPageProps {
  characterData: Character;
  id: string;
}

const CharacterPage: FC<CharacterPageProps> = ({ characterData, id }) => {
  // States
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Handlers
  const switchToEditMode = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const switchToReadMode = useCallback(() => {
    setIsEditMode(false);
  }, []);

  // Memoized values
  const cardImageProps = useMemo(() => {
    return {
      src: getCharacterImageLink(id),
      alt: `${characterData.name}'s photo`
    };
  }, [characterData.name, id]);

  return (
    <main className={styles.wrapper}>
      {isEditMode ? (
        <UpdateDataForm initialData={characterData} onCancel={switchToReadMode} />
      ) : (
        <ReadableTable
          data={characterData}
          actionButtons={
            <Button type="primary" onClick={switchToEditMode}>
              Edit
            </Button>
          }
        />
      )}
      <Card imageProps={cardImageProps} title={characterData.name + "'s photo"} />
    </main>
  );
};

CharacterPage.displayName = 'CharacterPage';

export default CharacterPage;
