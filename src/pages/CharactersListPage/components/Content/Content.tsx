import { useCallback, useEffect, FC } from 'react'

// Libs
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'antd/es/pagination'
import { usePrevious } from 'react-use'

// Store
import {
  fetchCharacters,
  setSearchQuery,
  setSelectedPage,
  charactersSelectors,
} from 'src/store/slices/Characters'

// Type definitions
import type { AppDispatch } from 'src/store'
import type { CharactersState } from 'src/store/slices/Characters/Characters.types'

// Styles
import styles from './Content.module.css'

// Components
import { CharacterCards } from './components'
import { SearchInput } from 'src/components'

const {
  selectCurrentPage,
  selectCurrentCharactersSearchQuery,
  selectAllCharacters,
  selectCount
} = charactersSelectors

const Content: FC = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()

  // Selectors
  const characters = useSelector(selectAllCharacters)
  const count = useSelector(selectCount)
  const selectedPage = useSelector(selectCurrentPage)
  const searchQuery = useSelector(selectCurrentCharactersSearchQuery)

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
    (newSearchValue: CharactersState['searchQuery']) => {
      dispatch(setSearchQuery({ searchQuery: newSearchValue }))
      dispatch(setSelectedPage({ selectedPage: 1 }))
    },
    [dispatch]
  )

  const handleSelectedPageChange = useCallback(
    (newPage: CharactersState['selectedPage']) => {
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
          onChangeEvent={handleSearchInputChange}
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
}

Content.displayName = 'Content'

export default Content
