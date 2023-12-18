import { useCallback, useEffect, FC } from 'react'

// Libs
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'antd/es/pagination'
import { usePrevious } from 'react-use'

// Store
import {
  fetchCharacters,
  selectAllCharacters,
  selectCount,
  setSearchQuery,
  setSelectedPage
} from 'src/store/slices/Characters.slice.js';

// Type definitions
import type {AppDispatch} from 'src/store';

// Styles
import styles from './Content.module.css'

// Components
import { SearchInput, CharacterCards } from '../index'

const Content: FC = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()

  // Selectors
  const characters = useSelector(selectAllCharacters)
  const count = useSelector(selectCount)
  const selectedPage = useSelector(state => state.characters.selectedPage)
  const searchQuery = useSelector(state => state.characters.searchQuery)

  const prevSearchQuery = usePrevious(searchQuery)
  const prevSelectedPage = usePrevious(selectedPage)

  // Effects
  useEffect(() => {
    if (typeof prevSearchQuery === 'undefined' || typeof prevSelectedPage === 'undefined') {
      return
    }

    dispatch(fetchCharacters())
  }, [selectedPage, searchQuery, dispatch, prevSearchQuery, prevSelectedPage])

  // Handlers
  const handleSearchInputChange = useCallback(
    newSearchValue => {
      dispatch(setSearchQuery({ searchQuery: newSearchValue }))
      dispatch(setSelectedPage({ selectedPage: 1 }))
    },
    [dispatch]
  )

  const handleSelectedPageChange = useCallback(
    newPage => {
      dispatch(setSelectedPage({ selectedPage: newPage }))
    },
    [dispatch]
  )

  return (
    <main className={styles.wrapper}>
      <div className={styles.header}>
        <SearchInput
          value={searchQuery}
          placeholder="Write character's name"
          onChange={handleSearchInputChange}
          className={styles.searchInput}
        />
        <Pagination
          defaultCurrent={1}
          current={selectedPage}
          total={count}
          onChange={handleSelectedPageChange}
          showSizeChanger={false}
          className={styles.pagination}
        />
      </div>
      <CharacterCards characters={characters} />
    </main>
  )
};

Content.displayName = 'Content';

export default Content
