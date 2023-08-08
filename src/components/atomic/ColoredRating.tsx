export enum TextSize {
  DEFAULT = "",
  TEXT_LG = "text-lg",
}

interface ColoredRating {
  rating: number;
  textSize?: TextSize;
}

export default function ColoredRating({ rating, textSize = TextSize.DEFAULT }: ColoredRating) {
  return (
    <p className={`${textSize} ${getRatingColor(rating)}`}>
      {rating}
    </p>
  );
}

function getRatingColor(rating: number) {
  let ratingColor = "text-nord14";

  if (rating <= 2.5) {
    ratingColor = "text-nord11";
  } else if (rating <= 5) {
    ratingColor = "text-nord12";
  } else if (rating <= 7.5) {
    ratingColor = "text-nord13";
  }

  return ratingColor;
} 
