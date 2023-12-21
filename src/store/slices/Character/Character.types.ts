import { Status } from 'src/types/Thunk.type'
import { Person } from 'src/types/Character.type'

export interface CharacterState {
  // id: Person['id'] | null;
  status: Status;
  data: Person | null;
  error?: string | null;
}
