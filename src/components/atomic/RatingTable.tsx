import ColoredRating, { TextSize } from "./ColoredRating";

export enum Direction {
  ROW,
  COLUMN
}

interface RatingTableProps {
  kpRating: number;
  imdbRating: number;
  kgRating: number;
  direction?: Direction;
}

export default function RatingTable({ kpRating, imdbRating, kgRating, direction = Direction.ROW }: RatingTableProps) {
  return (
    <div className={`flex flex-${direction === Direction.ROW ? "row" : "col"} justify-items-center bg-nord2 rounded ${direction === Direction.ROW ? "mx-1" : ""} shadow-sm`}>
      <Rating direction={direction} symbol="💩" rating={kgRating} title="Киноговно" />
      <Rating direction={direction} symbol="🎞️" rating={kpRating} title="Кинопоиск" />
      <Rating direction={direction} symbol="📼" rating={imdbRating} title="imdb" />
    </div>
  );
}

interface RatingProps {
  direction: Direction;
  symbol: string;
  rating: number;
  title: string;
}

function Rating({ direction, symbol, rating, title }: RatingProps) {
  return (
    <div title={title} className={`flex flex-row justify-start gap-2 mx-1 ${direction === Direction.ROW ? "py-0.5" : ""} hover:cursor-default`}>
      <p class="text-lg">{symbol}</p>
      <ColoredRating rating={rating} textSize={TextSize.TEXT_LG} />
    </div>
  );
}
