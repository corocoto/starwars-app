// Type definitions
import type {CharactersState} from 'src/store/slices/Characters/Characters.types'

const getQueryParams = ({pageNumber, searchRequest}: {pageNumber?: CharactersState['selectedPage'], searchRequest: CharactersState['searchQuery']}) => {
  let query = ''

  if (pageNumber && searchRequest) {
    query = `?page=${pageNumber}&search=${searchRequest}`;
  } else if (pageNumber) {
    query =`?page=${pageNumber}`;
  } else if (searchRequest) {
    query = `search=${searchRequest}`;
  }

  return query;
}

export default getQueryParams;
