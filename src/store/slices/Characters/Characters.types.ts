// Type definitions
import { Status } from 'src/types/Thunk.type'
import { Character } from 'src/types/Character.type'

export interface CharactersState {
  status: Status;
  error?: string | null;
  data: Character[];
  count: number;
  searchQuery: string,
  selectedPage: number
}
