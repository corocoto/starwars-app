// Type definitions
import { Status } from 'src/types/Thunk.type';
import { Character } from 'src/types/Character.type';

// Libs
import { SerializedError } from '@reduxjs/toolkit';

export interface CharactersState {
  status: Status;
  error?: SerializedError | null;
  data: Character[];
  count: number;
  searchQuery: string;
  selectedPage: number;
}
