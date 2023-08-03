export default function ColoredRating({ rating, className = "" }) {
  return (
    <p class={`${className} ${getRatingColor(rating)}`}>{rating}</p>
  );
}

function getRatingColor(rating) {
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
