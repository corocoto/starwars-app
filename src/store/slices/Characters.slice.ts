// Libs
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// APIs
import { api } from "src/services/api";

// Type definition
import type { Paginated, Person } from "src/types/Character.type";
import type { RootState } from '../index';

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export interface IChaptersState {
  status: Status;
  error?: string | null;
  data: Person[];
  count: number;
  searchQuery: string,
  selectedPage: number
}

const initialState = {
  data: [],
  status: Status.IDLE,
  error: null,
  count: 0,
  searchQuery: '',
  selectedPage: 1
};

const getQueryParams = ({pageNumber, searchRequest}: {pageNumber?: IChaptersState['selectedPage'], searchRequest: IChaptersState['searchQuery']}) => {
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


export const fetchCharacters = createAsyncThunk<Paginated<Person>>('characters/fetchCharacters', async (_args, {getState}) => {
  const state: RootState = getState();

  const queryParams = getQueryParams({
    pageNumber: state.characters.selectedPage,
    searchRequest: state.characters.searchQuery
  });

    const response = await api.get(`people/${queryParams}`);

  return response.data;
})

const charactersSlice = createSlice({
  name: 'characters',
  initialState: <IChaptersState>initialState,
  reducers: {
    setSearchQuery: (state, {payload}) => {
      const {searchQuery} = payload;
      state.searchQuery = searchQuery;
    },
    setSelectedPage: (state, {payload}) => {
      const {selectedPage} = payload;
      state.selectedPage = selectedPage
    },
  },
  extraReducers(builder) {
    builder
        .addCase(fetchCharacters.pending, (state: IChaptersState) => {
          state.status = Status.LOADING
        })
        .addCase(fetchCharacters.fulfilled, (state: IChaptersState, action) => {
          state.status = Status.SUCCEEDED;
          state.data = [...action.payload.results];
          state.count = action.payload.count;
        })
        .addCase(fetchCharacters.rejected, (state: IChaptersState, action) => {
          state.status = Status.FAILED;
          state.error = action.error.message;
        })
  }
});

// Actions
export const { setSearchQuery, setSelectedPage } = charactersSlice.actions;

// Selectors
export const selectAllCharacters = (state: RootState) => state.characters.data;
export const selectCharacterById = (state: RootState, characterId: Person['url']) => {
  return state.characters.data.find(character => {
    const url = character.url;
    const id = url.split('/').at(-2);
    return id === characterId
  });
}
export const selectCount = (state: RootState) => state.characters.count;
export const selectCurrentPage = (state: RootState) => state.characters.selectedPage;
export const selectCurentCharactersSearchQuery = (state: RootState) => state.characters.searchQuery

export default charactersSlice.reducer;
