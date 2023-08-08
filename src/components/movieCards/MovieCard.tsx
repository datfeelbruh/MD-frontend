import Card from "@components/atomic/Card"
import GenreList from "./GenreList"
import RatingTable from "@components/atomic/RatingTable"

interface Genre {
  name: string;
}

interface MovieCardProps {
  id: number;
  title: string;
  releaseYear: number;
  description: string;
  kpRating: number;
  imdbRating: number;
  averageRating: number;
  posterUrl: string;
  genres: Array<Genre>;
}

export default function MovieCard({ id, title, releaseYear, averageRating, kpRating, imdbRating, posterUrl, description, genres }: MovieCardProps) {
  return (
    <Card
      header={<Header title={title} releaseYear={releaseYear} />}
      imageURL={posterUrl}
      imageInfo={<YohohoButton id={id} />}
    >
      <div class="flex flex-col h-full">
        <div class="ps-1">{description}</div>
        <div class="p-1 h-full"><GenreList genres={genres} /></div>
        <RatingTable kpRating={kpRating} kgRating={averageRating} imdbRating={imdbRating} />
      </div>
    </Card>
  );
}

type HeaderProps = Pick<MovieCardProps, "title" | "releaseYear">

function Header({ title, releaseYear }: HeaderProps) {
  return (
    <div class="flex flex-row w-full text-lg">
      <p class="basis-1/2 ms-1">
        {title} ({releaseYear})
      </p>
    </div>
  );
}

type YohohoButtonProps = Pick<MovieCardProps, "id">

function YohohoButton({ id }: YohohoButtonProps) {
  return (
    <a class="flex justify-center py-1 w-full rounded shadow-sm bg-nord2 hover:bg-nord3" href={`https://4h0y.gitlab.io/#${id}`}>
      yohoho
    </a>
  );
}
