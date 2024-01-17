import { useEffect } from 'react';

// Libs
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useErrorBoundary } from 'react-error-boundary';

// Store
import { fetchCharacter, resetCharacterInfo, setPreloadedInformation } from 'src/store/slices/Character';

// Type definitions
import type { AppDispatch, RootState } from 'src/store';
import { Status } from 'src/types/Thunk.type';
import { CharacterPageProps } from './CharacterPage';

// Components
import Loading from 'src/components/Loading';

// Selectors
import { charactersSelectors } from 'src/store/slices/Characters';
import { characterSelectors } from 'src/store/slices/Character';

const { selectCharacterById } = charactersSelectors;
const { selectStatus, selectData, selectError } = characterSelectors;

interface GetCharacterDataWrapperProps {
  children: ({ id, characterData }: CharacterPageProps) => JSX.Element;
}

const CharacterPageDataWrapper = ({ children }: GetCharacterDataWrapperProps) => {
  // Hooks
  const id = useParams().id as string;
  const dispatch = useDispatch<AppDispatch>();
  const { showBoundary } = useErrorBoundary();

  // Selectors
  const loadedCharacter = useSelector((state: RootState) => selectCharacterById(state, id));
  const status = useSelector(selectStatus);
  const characterData = useSelector(selectData);
  const error = useSelector(selectError);

  // Effects
  useEffect(() => {
    if (typeof loadedCharacter === 'undefined') {
      dispatch(fetchCharacter(id));
    } else {
      dispatch(
        setPreloadedInformation({
          data: loadedCharacter
        })
      );
    }
  }, [dispatch, id, loadedCharacter]);

  useEffect(() => {
    return () => {
      dispatch(resetCharacterInfo());
    };
  }, [dispatch]);

  if (status === Status.LOADING) {
    return <Loading />;
  }

  if (status === Status.FAILED) {
    showBoundary(error);
  }

  if (characterData) {
    return children({ id, characterData });
  }
};

CharacterPageDataWrapper.displayName = 'CharacterPageDataWrapper';

export default CharacterPageDataWrapper;
