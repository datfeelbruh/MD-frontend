import Card from "@components/atomic/Card"
import ColoredRating from "@components/atomic/ColoredRating"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

interface ReviewCardProps {
  id: number;
  title: string;
  releaseYear: number;
  posterUrl: string;
  averageRating: number;
  rating: number;
  review: string;
}

export default function ExpandedReviewCard({ id, title, releaseYear, posterUrl, averageRating, rating, review }: ReviewCardProps) {
  return (
    <Card header={<Header id={id} title={title} releaseYear={releaseYear} averageRating={averageRating} rating={rating} />} imageURL={posterUrl}>
      <ReactMarkdown>
        {review}
      </ReactMarkdown>
    </Card>
  );
}

type HeaderProps = Omit<ReviewCardProps, "review" | "posterUrl">;

function Header({ id, title, releaseYear, averageRating, rating }: HeaderProps) {
  return (
    <a class="flex flex-row p-1 rounded-t bg-nord2 hover:text-nord4" href={`/movie/${id}`}>
      {title} ({releaseYear}) (<Rating rating={rating} averageRating={averageRating} />)
    </a>
  );
}

type RatingProps = Pick<HeaderProps, "rating" | "averageRating">;

function Rating({ rating, averageRating }: RatingProps) {
  return (
    <p class="flex flex-row gap-1">
      <ColoredRating rating={rating} />
      {averageRating !== null && (<p>|</p>)}
      {averageRating !== null && (<ColoredRating rating={averageRating} />)}
    </p>
  );
}

