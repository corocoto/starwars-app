import { useMemo } from 'react'

const useDataNormalize = ({ characterData }) => {
  return useMemo(
    () => [
      {
        key: 1,
        label: 'Name',
        children: characterData.name
      },
      {
        key: 2,
        label: 'Birth year',
        children: characterData.birth_year
      },
      {
        key: 3,
        label: 'Height',
        children: characterData.height + 'cm'
      },
      {
        key: 4,
        label: 'Mass',
        children: characterData.mass + 'kg'
      },
      {
        key: 5,
        label: 'Eye color',
        children: characterData.eye_color
      },
      {
        key: 6,
        label: 'Hair color',
        children: characterData.eye_color
      },
      {
        key: 7,
        label: 'Skin (body) color',
        children: characterData.skin_color
      },
      {
        key: 8,
        label: 'Gender',
        children: characterData.gender
      }
    ],
    [characterData]
  )
}

export default useDataNormalize
