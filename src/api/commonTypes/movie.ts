import { Genre } from "./genre"

export type Movie = {
  id: number,
  title: string,
  description: string,
  releaseYear: number,
  kpRating: number,
  imdbRating: number,
  averageRating: number,
  genres: Array<Genre>,
  posterUrl: string,
}
