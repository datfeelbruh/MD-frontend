import LoadingSvg from "@components/atomic/LoadingSpin";
import Paginator from "@components/atomic/Paginator";
import MovieCard from "@components/movieCards/MovieCard";
import ReviewCard from "@components/reviewCards/ReviewCard";
import { userStore } from "@stores/userStore";
import { delete_, displayError, get, post, put } from "@utils/requests";
import { MOVIES_URL, REVIEW_URL } from "@utils/urls";
import { useState, useEffect } from "preact/hooks";

interface MovieProps {
  id: number;
}

export default function Movie({ id }: MovieProps) {
  const [changed, setChanged] = useState(false);

  return (
    <div>
      <Header id={id} />
      <ReviewForm id={id} toggleChanged={() => setChanged(!changed)} />
      <ReviewList id={id} changed={changed} />
    </div>
  );
}

function Header({ id }: MovieProps) {
  const [movie, setMovie] = useState({ id, title: "", releaseYear: 0, averageRating: 0, kpRating: 0, imdbRating: 0, posterUrl: "", description: "", genres: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    get(MOVIES_URL.BY_ID(id))
      .then(data => data.json())
      .then(data => setMovie(data))
      .catch(error => displayError(error));

    setLoading(false);
  }, [id])

  if (loading) return <LoadingSvg />;
  return <MovieCard {...movie} />;
}

interface ReviewFormProps extends MovieProps {
  toggleChanged: () => void;
}

function ReviewForm({ id, toggleChanged }: ReviewFormProps) {
  const [review, setReview] = useState({ movieId: id, id: 0, review: "", rating: undefined });
  const [loading, setLoading] = useState(false);
  const user = userStore(state => state.user);

  function responseToReview(response: object) {
    const responseReview = response?.reviews?.[0] === undefined ? response : response.reviews[0];
    return { movieId: id, id: responseReview.id, review: responseReview.userReview.review, rating: responseReview.userReview.rating };
  }

  useEffect(() => {
    get(`${REVIEW_URL.SEARCH}?movieId=${id}&userId=${user.id}&limit=1`)
      .then(data => { setLoading(true); return data; })
      .then(data => data.json())
      .then(data => data.statusCode === 422 ? Promise.reject() : data)
      .then(data => setReview(responseToReview(data)))
      .catch(error => displayError(error))
      .then(() => setLoading(false));
  }, [id]);

  function onSubmit(event) {
    event.preventDefault();
    if (event.submitter.name === "create") {
      post(REVIEW_URL.CREATE, review)
        .then(data => { setLoading(true); return data; })
        .then(data => data.json())
        .then(data => setReview(responseToReview(data)))
        .catch(error => displayError(error))
        .then(() => { setLoading(false); toggleChanged() });
    }
    if (event.submitter.name === "update") {
      put(REVIEW_URL.UPDATE(review.id), review)
        .then(data => { setLoading(true); return data; })
        .then(data => data.json())
        .then(data => setReview(responseToReview(data)))
        .catch(error => displayError(error))
        .then(() => { setLoading(false); toggleChanged() });
    }
    if (event.submitter.name === "delete") {
      delete_(REVIEW_URL.DELETE(review.id))
        .then(() => setLoading(true))
        .then(() => setReview({ movieId: id, id: 0, review: "", rating: "" }))
        .catch(error => displayError(error))
        .then(() => { setLoading(false); toggleChanged() });
    }
  }

  return (
    <form class="flex flex-col" onSubmit={onSubmit}>
      <textarea
        class="p-1 px-2 mb-1 rounded shadow-sm resize-none w-70 bg-nord1 hover:bg-nord3 focus:bg-nord3 focus:outline-none"
        placeholder="Прекрасный фильм, не правда ли?"
        maxLength={1000} rows={5} required
        onInput={(e) => setReview({ ...review, review: e.target.value })}
        value={review?.review}
      />
      <div class="flex flex-row mb-1">
        <input
          class="flex justify-center text-center rounded shadow-sm basis-2/12 bg-nord2 hover:bg-nord3 focus:bg-nord3 focus:outline-none me-1"
          placeholder="Оценка"
          type="number" min="0" max="10" step="0.1" size={3} required
          onInput={(e) => setReview({ ...review, rating: e.target.value })}
          value={review?.rating}
        />
        {
          review?.id ?
            <>
              <button name="update" type="submit" class="w-full bg-nord2 hover:bg-nord3 rounded p-1">
                <div class="flex flex-row justify-center m-auto">
                  {loading && <LoadingSvg size={17} />}
                  Обновить
                </div>
              </button>
              <div class="me-1" />
              <button name="delete" type="submit" class="w-full bg-nord2 hover:bg-nord3 rounded p-1">
                <div class="flex flex-row justify-center m-auto">
                  {loading && <LoadingSvg size={17} />}
                  Удалить
                </div>
              </button>
            </>
            :
            <button name="create" type="submit" class="w-full bg-nord2 hover:bg-nord3 rounded p-1">
              <div class="flex flex-row justify-center m-auto">
                {loading && <LoadingSvg size={17} />}
                Создать
              </div>
            </button>
        }
      </div>
    </form>
  );
}

interface ReviewListProps extends MovieProps {
  changed: boolean;
}

function ReviewList({ id, changed }: ReviewListProps) {
  const [reviews, setReviews] = useState({ page: 1, pages: 1, reviews: [] });
  const [loading, setLoading] = useState(false);

  function request() {
    get(`${REVIEW_URL.SEARCH}?movieId=${id}&page=${reviews.page}`)
      .then(data => { setLoading(true); return data; })
      .then(data => data.json())
      .then(data => setReviews(data))
      .catch(error => displayError(error))
      .then(() => setLoading(false));
  }

  useEffect(() => request(), [reviews.page, changed]);

  if (loading) return <LoadingSvg />;

  return (
    <div>
      {reviews?.pages > 1 ? <Paginator page={reviews.page} maxPage={reviews.pages} setPage={(page) => setReviews({ ...reviews, page })} /> : null}
      {reviews.reviews.map(r => <ReviewCard id={r.id} userId={r.user.id} username={r.user.username} avatar={r.user.avatar} userReview={r.userReview} />)}
      {reviews?.pages > 1 ? <Paginator page={reviews.page} maxPage={reviews.pages} setPage={(page) => setReviews({ ...reviews, page })} /> : null}
    </div>
  );
}

