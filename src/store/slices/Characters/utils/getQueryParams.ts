// Type definitions
import type { CharactersState } from 'src/store/slices/Characters/Characters.types';

const getQueryParams = ({
  pageNumber,
  searchRequest
}: {
  pageNumber?: CharactersState['selectedPage'];
  searchRequest: CharactersState['searchQuery'];
}) => {
  const queryParams = new URLSearchParams();

  if (pageNumber) {
    queryParams.set('page', pageNumber.toString());
  }

  if (searchRequest) {
    queryParams.set('search', searchRequest);
  }

  return queryParams.toString();
};

export default getQueryParams;
