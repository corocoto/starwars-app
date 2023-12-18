import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCharacters,
  selectAllCharacters,
  selectCount,
  setSearchQuery,
  setSelectedPage
} from '../../store/slices/Characters.slice'
import { useCallback, useEffect } from 'react'
import styles from './CharactersListPage.module.css'

import Pagination from 'antd/es/pagination'
import { usePrevious } from 'react-use'

// Components
import { CharacterCards } from './components'
import SearchInput from './components/SearchInput/SearchInput'

const Content = () => {
  // Hooks
  const dispatch = useDispatch()

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
}

export default Content
