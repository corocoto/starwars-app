// Libs
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// APIs
import { api } from "src/services/api";

// Type definition
import type { Paginated, Person } from "src/types/Character.type";

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export interface IChaptersState {
  status: Status;
  error: string | null;
  data: Person[];
  count: number;
  searchQuery: '',
  selectedPage: 1
}

const initialState = {
  data: [],
  status: Status.IDLE,
  error: null,
  count: 0,
  searchQuery: '',
  selectedPage: 1
};

const getQueryParams = ({pageNumber, searchRequest}) => {
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


export const fetchCharacters = createAsyncThunk<Paginated<Person>>('characters/fetchCharacters', async (args,{getState}) => {
  const {characters} = getState();

  const queryParams = getQueryParams({
    pageNumber: characters.selectedPage,
    searchRequest: characters.searchQuery
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

export const { setSearchQuery, setSelectedPage } = charactersSlice.actions;

export const selectAllCharacters = state => state.characters.data;
export const selectCharacterById = (state, characterId) => {
  return state.characters.data.find(character => {
    const url = character.url;
    const id = url.split('/').at(-2);
    return id=== characterId
  });
}

export const selectCount = (state) => state.characters.count;

export default charactersSlice.reducer;
