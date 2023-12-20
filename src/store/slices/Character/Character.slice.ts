// Libs
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// APIs
// Type definition
import { Paginated, Person } from 'src/types/Character.type'
import { Status } from 'src/types/Thunk.type'
import { CharacterState } from 'src/store/slices/Character/Character.types'


const initialState = {
  id: null,
  data: null,
  status: Status.IDLE,
  error: null,
};

// Thunks
export const fetchCharacter = createAsyncThunk<Paginated<Person>>('character/fetchCharacter', async (args) => {
  debugger;
  // const response = api.get(`/people/${id}`);

  // return response.data;
})


const characterSlice = createSlice({
  name: 'character',
  initialState: <CharacterState>initialState,
  reducers: {
    setPreloadedInformation: (state, {payload}) => {
      const {data, characterId} = payload;
      state.data = data;
      state.id = characterId;
      state.status = Status.SUCCEEDED;
    },
    editCharacter: (state, {payload}) => {
      const { data } = payload;
      state.data = data;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCharacter.pending, (state: CharacterState) => {
        state.status = Status.LOADING
      })
      .addCase(fetchCharacter.fulfilled, (state: CharacterState, action) => {
        state.status = Status.SUCCEEDED;
        state.data = action.payload.results;
      })
      .addCase(fetchCharacter.rejected, (state: CharacterState, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
    })
  }
})


// Actions
export const {setPreloadedInformation, editCharacter} = characterSlice.actions;

export default characterSlice.reducer;
