// Libs
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Components
import Loading from '../../../components/Loading'
import { selectCharacterById } from '../../../store/slices/Characters.slice'

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
