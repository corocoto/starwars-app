import { useCallback, useEffect, useState } from 'react'

// Components
import Loading from 'src/components/Loading'

const withCharacterThirdPartyData =
  WrappedComponent =>
  ({ characterData, ...rest }) => {
    // State
    const [detailedCharacterData, setDetailedCharacterData] = useState(characterData)
    const [isLoading, setIsLoading] = useState(true)

    // Handlers
    const getFilms = useCallback(async () => {
      const filmsList = await Promise.all(
        characterData.films.map(film => {
          return fetch(film).then(response => response.json())
        })
      )

      return filmsList.map(({ title }) => title)
    }, [characterData.films])

    const getVehicles = useCallback(async () => {
      const vehiclesList = await Promise.all(
        characterData.vehicles.map(film => {
          return fetch(film).then(response => response.json())
        })
      )

      return vehiclesList.map(({ name }) => name)
    }, [characterData.vehicles])

    const getStarships = useCallback(async () => {
      const starshipsList = await Promise.all(
        characterData.starships.map(starship => {
          return fetch(starship).then(response => response.json())
        })
      )

      return starshipsList.map(({ name }) => name)
    }, [characterData.starships])

    const getHomeWorld = useCallback(async () => {
      if (!characterData.homeworld) return
      const json = await fetch(characterData.homeworld).then(response => response.json())

      return json.name
    }, [characterData.homeworld])

    // Effects
    useEffect(() => {
      Promise.all([getHomeWorld(), getFilms(), getVehicles(), getStarships()])
        .then(data => {
          const [home, films, vehicles, starships] = data
          setDetailedCharacterData(prevState => ({
            ...prevState,
            homeworld: home,
            films,
            vehicles,
            starships
          }))
          setTimeout(setIsLoading, 0, false)
        })
        .catch(console.error)
    }, [getFilms, getHomeWorld, getStarships, getVehicles])

    if (isLoading) {
      return <Loading />
    }

    return <WrappedComponent {...rest} characterData={detailedCharacterData} />
  }

export default withCharacterThirdPartyData
