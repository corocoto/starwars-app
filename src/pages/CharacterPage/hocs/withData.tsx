import { FC, useEffect } from 'react'

// Libs
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Store
import {fetchCharacter, setPreloadedInformation} from 'src/store/slices/Character'

// Type definitions
import type { AppDispatch, RootState } from 'src/store'
import {Status} from 'src/types/Thunk.type'

// Components
import Loading from 'src/components/Loading'

// Selectors
import { charactersSelectors } from 'src/store/slices/Characters';
import {characterSelectors} from 'src/store/slices/Character'

// Type definitions
import { CharacterPageProps } from 'src/pages/CharacterPage/CharacterPage'

const {selectCharacterById} = charactersSelectors;
const {selectStatus, selectData} = characterSelectors;


const withData = <P extends CharacterPageProps>(WrappedComponent) => {
  const Component: FC<P> = () => {
    // Hooks
    const id = (useParams().id as string);
    const dispatch = useDispatch<AppDispatch>()

    // Selectors
    const loadedCharacter = useSelector((state: RootState) => selectCharacterById(state, id))
    const status = useSelector(selectStatus);
    const characterData = useSelector(selectData);

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
      return <WrappedComponent id={id} characterData={characterData} />
    }
  }
  return Component;
  }



export default withData
