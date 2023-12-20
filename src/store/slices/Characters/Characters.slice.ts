// Libs
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// APIs
import { api } from "src/services/api";

// Type definition
import type { Person } from "src/types/Character.type";
import { Paginated, Status } from 'src/types/Thunk.type';
import type { RootState } from 'src/store';
import type { CharactersState } from './Characters.types'

// Misc
import getQueryParams from './utils/getQueryParams'

const initialState = {
  data: [],
  status: Status.IDLE,
  error: null,
  count: 0,
  searchQuery: '',
  selectedPage: 1
};

// Thunks
export const fetchCharacters = createAsyncThunk<Paginated<Person[]>>('characters/fetchCharacters', async (_args, {getState}) => {
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
  initialState: <CharactersState>initialState,
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
        .addCase(fetchCharacters.pending, (state: CharactersState) => {
          state.status = Status.LOADING
        })
        .addCase(fetchCharacters.fulfilled, (state: CharactersState, action) => {
          state.status = Status.SUCCEEDED;
          state.data = [...action.payload.results];
          state.count = action.payload.count;
        })
        .addCase(fetchCharacters.rejected, (state: CharactersState, action) => {
          state.status = Status.FAILED;
          state.error = action.error.message;
        })
  }
});

// Actions
export const { setSearchQuery, setSelectedPage } = charactersSlice.actions;

export default charactersSlice.reducer;
