import { Status } from 'src/types/Thunk.type'
import type { Person } from 'src/types/Character.type'

export interface CharactersState {
  status: Status;
  error?: string | null;
  data: Person[];
  count: number;
  searchQuery: string,
  selectedPage: number
}
