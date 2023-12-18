import {useCallback, useEffect} from 'react';

// Libs
import {useSelector, useDispatch} from "react-redux";
import Pagination from 'antd/es/pagination';
import {usePrevious} from "react-use";


// Components
import Loading from '../../components/Loading';
import {CharacterCards} from "./components";
import SearchInput from './components/SearchInput/SearchInput';


// Styles
import styles from './CharactersListPage.module.css';

// Store, actions and etc.
import {fetchCharacters, selectAllCharacters, selectCount, Status, setSearchQuery, setSelectedPage} from "../../store/slices/Characters.slice";

import Content from './Content';

// Type definitions
import type { AppDispatch } from "../../store";

const CharactersListPage = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();


  // Selectors
  const status = useSelector(state => state.characters.status);

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
    return <Content/>
  }

  if (status === Status.FAILED) {
    return <h1>Error</h1>
  }
};



CharactersListPage.displayName = 'CharactersListPage';

export default CharactersListPage;
