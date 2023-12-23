import { useMemo } from 'react'

// Type definitions
import { Character } from 'src/types/Character.type'

interface UseDataNormalizeProps {
  data: Character
}

const useDataNormalize = ({ data }: UseDataNormalizeProps) => {
  return useMemo(
    () => [
      {
        key: 1,
        label: 'Name',
        children: data.name
      },
      {
        key: 2,
        label: 'Birth year',
        children: data.birth_year
      },
      {
        key: 3,
        label: 'Height',
        children: data.height + 'cm'
      },
      {
        key: 4,
        label: 'Mass',
        children: data.mass + 'kg'
      },
      {
        key: 5,
        label: 'Eye color',
        children: data.eye_color
      },
      {
        key: 6,
        label: 'Hair color',
        children: data.hair_color
      },
      {
        key: 7,
        label: 'Skin (body) color',
        children: data.skin_color
      },
      {
        key: 8,
        label: 'Gender',
        children: data.gender
      }
    ],
    [data]
  )
}

export default useDataNormalize
