// Type definition
import { RootState } from 'src/store';

// Misc
import { getUrlId } from 'src/utils';

// Selectors
export const selectAllCharacters = (state: RootState) => state.characters.data;
export const selectCharacterById = (state: RootState, characterId: string) => {
  return state.characters.data.find(character => {
    return getUrlId(character.url) === characterId;
  });
};
export const selectCount = (state: RootState) => state.characters.count;
export const selectCurrentPage = (state: RootState) => state.characters.selectedPage;
export const selectCurrentCharactersSearchQuery = (state: RootState) => state.characters.searchQuery;
export const selectStatus = (state: RootState) => state.characters.status;
