// Styles
import styles from './CharacterCards.module.css'

// Misc
import { getUrlId } from 'src/utils/getUrlId'

// Components
import { CharacterCard } from './components/index.js'

const CharacterCards = ({ characters }) => {
  return (
    <div className={styles.wrapper}>
      {characters.map(character => {
        const imageSrc = `https://starwars-visualguide.com/assets/img/characters/${getUrlId(character.url)}.jpg`

        return <CharacterCard key={character.name} imageSrc={imageSrc} details={character} />
      })}
    </div>
  )
}

export default CharacterCards
