import { User } from "./user"

export type Review = {
  id: number,
  user: User,
  movieId: number,
  review: string,
  rating: number,
}
