import Card from "@components/atomic/Card"
import RatingTable, { Direction } from "@components/atomic/RatingTable"
import ReviewCard from "@components/reviewCards/ReviewCard"
import trim from "@utils/trim"

interface User {
  id: number;
  username: string;
  avatar: string | null;
}

interface Review {
  id: number;
  user: User;
  rating: number;
  review: string;
}

interface ExpandedMovieCardProps {
  id: number;
  title: string;
  releaseYear: number;
  description: string;
  kpRating: number;
  imdbRating: number;
  averageRating: number;
  posterUrl: string;
  reviews: Array<Review>;
}

export default function ExpandedMovieCard({ id, title, releaseYear, description, kpRating, imdbRating, averageRating, posterUrl, reviews }: ExpandedMovieCardProps) {
  return (
    <Card
      header={<Header id={id} title={title} releaseYear={releaseYear} />}
      imageURL={posterUrl}
      imageInfo={<RatingTable kpRating={kpRating} kgRating={averageRating} imdbRating={imdbRating} direction={Direction.COLUMN} />}
    >
      <div class="flex flex-col me-3">
        <div class="mt-1 mb-2">
          {description}
        </div>
        <div>
          {reviews?.map(r =>
            <ReviewCard
              id={r.id}
              userId={r.user.id}
              username={r.user.username}
              avatar={r.user.avatar}
              userReview={{ rating: r.rating, review: trim(r.review) }}
            />
          )}
        </div>
      </div>
    </Card>
  );
}

type HeaderProps = Pick<ExpandedMovieCardProps, "id" | "title" | "releaseYear">;

function Header({ id, title, releaseYear }: HeaderProps) {
  return (
    <a class="py-1 text-lg rounded-t shadow-sm ps-2 bg-nord-2 hover:text-nord4" href={`/movie/${id}`}>
      {title} ({releaseYear})
    </a>
  );
}

