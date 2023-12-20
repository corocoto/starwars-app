import { FC, useEffect } from 'react'

// Libs
import { useSelector, useDispatch } from 'react-redux'

// Components
import { Loading } from 'src/components'
import { Content } from './components'

// Thunks
import { fetchCharacters } from 'src/store/slices/Characters';

// Selectors
import {selectStatus} from 'src/store/slices/Characters/selectors'

// Type definitions
import type { AppDispatch } from 'src/store'
import {Status} from 'src/types/Thunk.type'

const CharactersListPage: FC = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()

  // Selectors
  const status = useSelector(selectStatus)

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
