import { useCallback, useEffect, useState } from 'react'

// Type definitions
import { Character } from 'src/types/Character.type'

type Film = {
  title: string
  url: string
}

type Vehicle = {
  name: string
  url: string
}

type Starship = {
  name: string
  url: string
}

type HomeWorld = {
  name: string
  url: string
}

export function useCharacter(data: Character | undefined) {
  const [films, setFilms] = useState<Film[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [starships, setStarships] = useState<Starship[]>([])
  const [homeWorld, setHomeWorld] = useState<HomeWorld>({
    name: '',
    url: ''
  })
  const [isLoading, setIsLoading] = useState(true)

  const getFilms = useCallback(async () => {
    const filmsList = await Promise.all(
      data?.films.map(film => {
        return fetch(film).then(response => response.json())
      })
    )

    return filmsList.map(({ title, url }) => ({ url, title }))
  }, [data?.films])

  const getVehicles = useCallback(async () => {
    const vehiclesList = await Promise.all(
      data?.vehicles.map(film => {
        return fetch(film).then(response => response.json())
      })
    )

    return vehiclesList.map(({ name, url }) => ({ name, url }))
  }, [data?.vehicles])

  const getStarships = useCallback(async () => {
    const starshipsList = await Promise.all(
      data?.starships.map(starship => {
        return fetch(starship).then(response => response.json())
      })
    )

    return starshipsList.map(({ name, url }) => ({ name, url }))
  }, [data?.starships])

  const getHomeWorld = useCallback(async () => {
    if (!data?.homeworld) return
    const json = await fetch(data.homeworld).then(response => response.json())

    return {
      name: json.name,
      url: json.url
    }
  }, [data?.homeworld])

  useEffect(() => {
    Promise.all([getHomeWorld(), getFilms(), getVehicles(), getStarships()])
      .then(data => {
        const [home, films, vehicles, starships] = data
        setHomeWorld(home)
        setFilms(films)
        setVehicles(vehicles)
        setStarships(starships)
        setTimeout(setIsLoading, 0, false)
      })
      .catch(console.error)
  }, [getFilms, getHomeWorld, getStarships, getVehicles])

  return {
    films,
    vehicles,
    starships,
    homeWorld,
    isLoading
  }
}
