const API_KEY = '0a7c8548799bc93ad435ddfb6c49f1e3'
const BASE_PATH = 'https://api.themoviedb.org/3'

interface IMovice {
  id: number
  backdrop_path: string
  poster_path: string
  title: string
  overview: string
}
export interface IGetMoviesResult {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: IMovice[]
  total_pages: number
  total_result: number
}
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    response => response.json()
  )
}
