// Type definitions
import { Character } from 'src/types/Character.type';
import { FormFields } from './hooks/useInitialFormValues';

export interface UpdateDataFormProps {
  initialData: Character;
  onCancel: () => void;
}

export type FieldValue = string[] | number | string;

export type AllFormValues = { [K in keyof FormFields]: FieldValue };
