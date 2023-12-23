import { FC, useCallback, useMemo, useState } from 'react';

// Components
import { Card } from 'src/components';
import { ReadableTable, UpdateDataForm } from './components';

// Libs
import Button from 'antd/es/button';

// HOCs
import withData from './hocs/withData';

// Styles
import styles from './CharacterPage.module.css';

// Type definition
import { Character } from 'src/types/Character.type';

export interface CharacterPageProps {
  characterData: Character
  id: string
}

const CharacterPage: FC<CharacterPageProps | undefined> = ({ characterData, id }) => {
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
      src: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
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

export default withData(CharacterPage);
