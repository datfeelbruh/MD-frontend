import ColoredRating from "./atomic/ColoredRating";

export default function RatingFooter({kpRating, imdbRating, kgRating}) {
  return (
    <div class="flex flex-row justify-items-center bg-nord2 rounded mx-1 shadow-sm">
      <Rating symbol="💩" rating={kgRating} title="Киноговно" />
      <Rating symbol="🎞️" rating={kpRating} title="Кинопоиск" />
      <Rating symbol="📼" rating={imdbRating} title="imdb" />
    </div>
  );
}

function Rating({symbol, rating, title}) {
  return (
    <div title={title} class="flex flex-row justify-start gap-2 mx-1 py-0.5">
      <p class="text-lg">{symbol}</p>
      <ColoredRating rating={rating} className="text-lg" />
    </div>
  );
}
