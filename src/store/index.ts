import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from './slices/Characters.slice'

const store = configureStore({
  reducer: {
    characters: charactersReducer
  }
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
