// Type definitions
import { Character } from "src/types/Character.type";
import { AllFormValues, FieldValue } from "../UpdateDataForm.types";

const getNormalizedValue = (value: FieldValue , key: keyof AllFormValues): string => {
  if (Array.isArray(value)) {
    return value.join();
  }

  if (key === 'birth_year') {
    return value + 'BBY';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return value;
};

const getNormalizedCharacterData = (characterStoreData: Character, updatedFormData: AllFormValues): Character => {
  const result = structuredClone(characterStoreData);

  for (const key in updatedFormData) {
      // @ts-ignore
      result[key] = getNormalizedValue(updatedFormData[key as keyof AllFormValues], key as keyof AllFormValues);
  }

  return result;
};

export default getNormalizedCharacterData;
