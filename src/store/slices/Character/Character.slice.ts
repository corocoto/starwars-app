// Libs
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// APIs
import { api } from 'src/services/api';

// Type definition
import { Character } from 'src/types/Character.type';
import { Status } from 'src/types/Thunk.type';
import { CharacterState } from 'src/store/slices/Character/Character.types';



const initialState = {
  data: null,
  status: Status.IDLE,
  error: null,
};

// Thunks
export const fetchCharacter = createAsyncThunk<Character, string, { rejectValue: Error }>('character/fetchById', async (characterId) => {
  const response = await api.get(`/people/${characterId}`);
  return response.data;
});


const characterSlice = createSlice({
  name: 'character',
  initialState: <CharacterState>initialState,
  reducers: {
    setPreloadedInformation: (state, {payload}) => {
      const {data} = payload;
      state.data = data;
      state.status = Status.SUCCEEDED;
    },
    updateCharacterInfo: (state, {payload}) => {
      const { data } = payload;
      state.data = data;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCharacter.pending, (state: CharacterState) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchCharacter.fulfilled, (state: CharacterState, action) => {
        state.status = Status.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchCharacter.rejected, (state: CharacterState, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
    });
  }
});


// Actions
export const {setPreloadedInformation, updateCharacterInfo} = characterSlice.actions;

export default characterSlice.reducer;
