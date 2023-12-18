// Libs
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Components
import Loading from 'src/components/Loading'

// Selectors
import { selectCharacterById } from 'src/store/slices/Characters.slice'

const withPreloadedData = WrappedComponent => () => {
  // Hooks
  const { id } = useParams()

  const character = useSelector(state => selectCharacterById(state, id))

  if (typeof character === 'undefined') {
    return <Loading />
  }

  return <WrappedComponent id={id} characterData={character} />
}

export default withPreloadedData
