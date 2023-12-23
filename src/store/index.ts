// Libs
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import { charactersReducer, characterReducer } from './slices';

const store = configureStore({
  reducer: {
    character: characterReducer,
    characters: charactersReducer
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
