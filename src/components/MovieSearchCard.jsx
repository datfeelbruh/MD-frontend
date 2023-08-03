import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Avatar from "@atomic/Avatar";
import ColoredRating from "@atomic/ColoredRating";
import Card from "@atomic/Card";
import Rating from "./Rating";

export default function MovieSearchCard(props) {
  const Header = (
    <a class="py-1 text-lg rounded-t shadow-sm ps-2 bg-nord-2 hover:text-nord4" href={`/movie/${props.id}`}>{props.title} ({props.releaseYear})</a>
  );

  const RatingTable = (
    <Rating row={false} kpRating={props.kpRating} kgRating={props.averageRating} imdbRating={props.imdbRating} />
  );

  return (
    <Card header={Header} imageUrl={props.posterUrl} imageInfo={RatingTable}>
      <div class="flex flex-col me-3">
        <div class="mt-1 mb-2">
          {trim(props.description)}
        </div>
        <div>
          {props.reviews.map(r => <Review {...{ ...r, userReview: { review: trim(r.review, 120), rating: r.rating } }} />)}
        </div>
      </div>
    </Card>
  );
}

function Review({ id, userId, username, userReview }) {
  return (
    <div class="flex flex-col p-2 mb-1 w-full break-words rounded shadow-sm text bg-nord2" key={id}>
      <a class="mb-1 hover:text-nord4" href={`/user/${userId}`}>
        <div class="flex flex-row gap-2">
          <Avatar nickname={username} />
          <p class="flex flex-row gap-1">{username} (<ColoredRating rating={userReview.rating} />)</p>
        </div>
      </a>
      <ReactMarkdown>
        {userReview.review}
      </ReactMarkdown>
    </div>
  );
}

function trim(text, trimSize = 200, maxSize = trimSize + 50) {
  if (text.length <= trimSize) return text;
  let trimIdx = text.slice(trimSize).indexOf('.');
  if (trimIdx > maxSize) trimIdx = text.slice(trimSize).indexOf(' ');
  return text.slice(0, trimSize + trimIdx) + "...";
}
