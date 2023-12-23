// Type definitions
import { Status } from 'src/types/Thunk.type'
import { Character } from 'src/types/Character.type'

export interface CharacterState {
  status: Status;
  data: Character | null;
  error?: string | null;
}
