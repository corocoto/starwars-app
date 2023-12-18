import { useCallback, useState } from 'react'

// Libs
import Card from 'antd/es/card'
import Descriptions from 'antd/es/descriptions'
import Switch from 'antd/es/switch'

// HOCs
import withPreloadedData from './hocs/withPreloadedData'

// Hooks
import useDataNormalize from './hooks/useDataNormalize'

// Styles
import styles from './CharacterPage.module.css'

const CharacterPage = ({ characterData, id }) => {
  // States
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  // Hooks
  const normalizedCharacterData = useDataNormalize({ characterData });

  // Handlers
  const handleModeChange = useCallback(() => {}, [])

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
        style={{ width: 300 }}
        cover={
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt={`Photo of ${characterData.name}`}
          />
        }
      >
        <Card.Meta title={characterData.name + "'s photo"} />
      </Card>
    </main>
  )
}

export default withPreloadedData(CharacterPage)
