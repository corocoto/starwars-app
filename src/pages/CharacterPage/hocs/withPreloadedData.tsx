import { FC, useEffect } from 'react'

// Libs
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Store
import {fetchCharacter, setPreloadedInformation} from 'src/store/slices/Character'

// Type definitions
import type { AppDispatch } from 'src/store'
import {Status} from 'src/types/Thunk.type'

// Components
import Loading from 'src/components/Loading'

// Selectors
import { charactersSelectors } from 'src/store/slices/Characters';
import {characterSelectors} from 'src/store/slices/Character'

// Type definitions
import { CharacterPageProps } from 'src/pages/CharacterPage/CharacterPage'

const {selectCharacterById} = charactersSelectors;
const {selectStatus} = characterSelectors;

const withPreloadedData = <P extends CharacterPageProps>(WrappedComponent) => {
  const Component: FC<P> = () => {
    // Hooks
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>()

    // Selectors
    const loadedCharacter = useSelector(state => selectCharacterById(state, id))
    const status = useSelector(selectStatus);

    useEffect(() => {
      if (typeof loadedCharacter === 'undefined') {
        dispatch(fetchCharacter(id));
      } else {
        dispatch(setPreloadedInformation({
          data: loadedCharacter,
          characterId: id
        }))
      }
    }, [dispatch, id, loadedCharacter]);

    if (status === Status.LOADING) {
      return <Loading />
    }

    if (status === Status.FAILED) {
      return <h1>Error</h1>
    }

    if (status === Status.SUCCEEDED) {
      return <WrappedComponent id={id} characterData={character} />
    }
  }
  return Component;
  }



export default withPreloadedData
