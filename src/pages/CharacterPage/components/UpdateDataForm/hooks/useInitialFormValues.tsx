import { useMemo } from 'react';

// Constants
import { UNKNOWN_VALUE } from '../constants';

// Type definitions
import { Character } from 'src/types/Character.type';

export interface FormFields {
  name: string;
  birth_year: number;
  height: string;
  mass: string;
  eye_color: string;
  hair_color: string[];
  skin_color: string[];
  gender: string;
}

const useInitialFormValues = (data: Character) => {
  return useMemo(
    () => ({
      name: data.name,
      birth_year: parseFloat(data.birth_year),
      height: data.height,
      mass: data.mass,
      eye_color: data.eye_color ?? UNKNOWN_VALUE,
      hair_color: data.hair_color.split(','),
      skin_color: data.skin_color.split(','),
      gender: data.gender ?? UNKNOWN_VALUE
    }),
    [data]
  );
};

export default useInitialFormValues;
