import { FC, useEffect } from 'react';

// Libs
import { useSelector, useDispatch } from 'react-redux';
import { useErrorBoundary } from 'react-error-boundary';

// Components
import { Loading } from 'src/components';
import { Content } from './components';

// Thunks
import { fetchCharacters } from 'src/store/slices/Characters';

// Selectors
import { selectStatus, selectError } from 'src/store/slices/Characters/selectors';

// Type definitions
import type { AppDispatch } from 'src/store';
import { Status } from 'src/types/Thunk.type';

const CharactersListPage: FC = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { showBoundary } = useErrorBoundary();

  // Selectors
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  // Effects
  useEffect(() => {
    if (status === Status.IDLE) {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  if (status === Status.LOADING) {
    return <Loading />;
  }

  if (status === Status.SUCCEEDED) {
    return <Content />;
  }

  if (status === Status.FAILED) {
    showBoundary(error);
  }
};

CharactersListPage.displayName = 'CharactersListPage';

export default CharactersListPage;
