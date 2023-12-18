import { FC, useEffect } from 'react'

// Libs
import { useSelector, useDispatch } from 'react-redux'

// Components
import Loading from 'src/components/Loading'


// Store, actions and etc.
import {
  fetchCharacters,
  Status,
} from 'src/store/slices/Characters.slice'

import { Content } from './components'

// Type definitions
import type { AppDispatch } from '../../store'

const CharactersListPage: FC = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()

  // Selectors
  const status = useSelector(state => state.characters.status)

  // Effects
  useEffect(() => {
    if (status === Status.IDLE) {
      dispatch(fetchCharacters())
    }
  }, [dispatch, status])

  if (status === Status.LOADING) {
    return <Loading />
  }

  if (status === Status.SUCCEEDED) {
    return <Content />
  }

  if (status === Status.FAILED) {
    return <h1>Error</h1>
  }
}

CharactersListPage.displayName = 'CharactersListPage'

export default CharactersListPage
