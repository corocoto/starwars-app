import { FC, useCallback, useMemo, useState } from 'react'

// Components
import { Card } from 'src/components';

// Libs
import Descriptions from 'antd/es/descriptions'
import Switch from 'antd/es/switch'

// HOCs
import withPreloadedData from './hocs/withPreloadedData'

// Hooks
import useDataNormalize from './hooks/useDataNormalize'

// Styles
import styles from './CharacterPage.module.css'

// Type definition
import type { Person } from 'src/types/Character.type'

export interface CharacterPageProps {
  characterData: Person,
  id: Person['id']
}

const CharacterPage: FC<CharacterPageProps> = ({ characterData, id }) => {
  // States
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  // Hooks
  const normalizedCharacterData = useDataNormalize({ characterData })

  // Handlers
  const handleModeChange = useCallback(() => {}, [])

  // Memoized values
  const cardImageProps = useMemo(() => {
    return {
      src: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
      alt: `${characterData.name}'s photo`
    }
  },[characterData.name, id]);

  return (
    <main className={styles.wrapper}>
      <Descriptions
        title={`${characterData.name} information:`}
        layout="vertical"
        items={normalizedCharacterData}
        extra={
          <Switch checkedChildren="Edit Mode" unCheckedChildren="Read Mode" defaultUnchecked checked={isEditMode} />
        }
        bordered
      />
      <Card
        imageProps={cardImageProps}
        title={characterData.name + "'s photo"}
      />
    </main>
  )
}

export default withPreloadedData(CharacterPage)
