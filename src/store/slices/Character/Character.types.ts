// Type definitions
import { Status } from 'src/types/Thunk.type';
import { Character } from 'src/types/Character.type';

// Libs
import { SerializedError } from '@reduxjs/toolkit';

export interface CharacterState {
  status: Status;
  data: Character | null;
  error?: SerializedError | null;
}
