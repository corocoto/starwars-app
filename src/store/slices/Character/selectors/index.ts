// Type definition
import { RootState } from 'src/store';

export const selectStatus = (state: RootState) => state.character.status;
export const selectData = (state: RootState) => state.character.data;
export const selectError = (state: RootState) => state.character.error;
