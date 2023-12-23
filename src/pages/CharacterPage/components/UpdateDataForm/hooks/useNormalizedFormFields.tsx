import { useMemo } from 'react'

// Type definitions
import { Character } from 'src/types/Character.type'

const useNormalizedFormFields = (data: Character) => {
  return useMemo(() => {
    return [
      {
        name: ['name'],
        value: data.name
      },
      {
        name: ['birth_year'],
        value: data.birth_year
      },
      {
        name: ['height'],
        value: data.height
      },
      {
        name: ['mass'],
        value: data.mass
      },
      {
        name: ['eye_color'],
        value: data.eye_color
      },
      {
        name: ['hair_color'],
        value: data.hair_color
      },
      {
        name: ['skin_color'],
        value: data.skin_color
      },
      {
        name: ['gender'],
        value: data.gender
      }
    ]
  }, [data])
}

export default useNormalizedFormFields
