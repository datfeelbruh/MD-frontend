import ColoredRating from "./atomic/ColoredRating";

export default function Rating({kpRating, imdbRating, kgRating, row = true}) {
  return (
    <div className={`flex flex-${row ? "row" : "col"} justify-items-center bg-nord2 rounded ${row ? "mx-1" : ""} shadow-sm`}>
      <RatingInfo row={row} symbol="💩" rating={kgRating} title="Киноговно" />
      <RatingInfo row={row} symbol="🎞️" rating={kpRating} title="Кинопоиск" />
      <RatingInfo row={row} symbol="📼" rating={imdbRating} title="imdb" />
    </div>
  );
}

function RatingInfo({row, symbol, rating, title}) {
  return (
    <div title={title} className={`flex flex-row justify-start gap-2 mx-1 ${row ? "py-0.5" : ""}`}>
      <p class="text-lg">{symbol}</p>
      <ColoredRating rating={rating} className="text-lg" />
    </div>
  );
}
