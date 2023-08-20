import useMovieRequest from "@api/movie/movieRequest";
import useCreateReviewRequest from "@api/review/createReviewRequest";
import useDeleteReviewRequest from "@api/review/deleteReviewRequest";
import useGetReviewsRequest, { useGetUserReviewRequest } from "@api/review/getReviewsRequest";
import useUpdateReviewRequest from "@api/review/updateReviewRequest";
import LoadingSvg from "@components/atomic/LoadingSpin";
import Paginator from "@components/atomic/Paginator";
import MovieCard from "@components/movieCards/MovieCard";
import ReviewCard from "@components/reviewCards/ReviewCard";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { userStore } from "@stores/userStore";
import { useState, useEffect } from "preact/hooks";
import { toast } from "react-toastify";

interface MovieProps {
  id: number;
}

export default function Movie({ id }: MovieProps) {
  const [changed, setChanged] = useState(false);

  return (
    <div class="flex flex-col">
      <Header id={id} />
      <ReviewForm id={id} toggleChanged={() => setChanged(!changed)} />
      <ReviewList id={id} changed={changed} />
    </div>
  );
}

function Header({ id }: MovieProps) {
  const { call, response, isLoading, isError } = useMovieRequest(id);

  useEffect(() => call(), [id])

  if (isLoading) return <Loading />;
  if (isError) return <Error message={response.fail.message} />

  return <MovieCard {...response.success} />;
}

interface ReviewFormProps extends MovieProps {
  toggleChanged: () => void;
}

function ReviewForm({ id, toggleChanged }: ReviewFormProps) {
  const userId = userStore(state => state?.user?.id);

  const { call: getReview, response: review, setResponse: setReview, isLoading: isGetLoading, isError: isGetError } = useGetUserReviewRequest({ movieId: id, userId });

  const { call: createReview, isLoading: isCreateLoading } = useCreateReviewRequest(
    { movieId: id, review: review?.success?.review, rating: review?.success?.rating },
    data => { review.success = { ...review.success, ...(data) }; setReview(review); toggleChanged(); toast.success("Ревью пользователя успешно создано"); },
    error => toast.error(error.message),
  );

  const { call: updateReview, isLoading: isUpdateLoading } = useUpdateReviewRequest(
    review?.success?.id,
    { review: review?.success?.review, rating: review?.success?.rating },
    () => { setReview({ ...review }); toggleChanged(); toast.success("Ревью пользователя успешно обновлено"); },
    error => toast.error(error.message),
  );

  const { call: deleteReview, isLoading: isDeleteLoading } = useDeleteReviewRequest(
    review?.success?.id,
    () => { setReview({ fail: review.fail, success: null }); toggleChanged(); toast.success("Ревью пользователя успешно удалено") },
    error => toast.error(error.message),
  );

  useEffect(() => getReview(), [id]);

  function updateReviewText(value: string) {
    review.success = { ...review.success, review: value };
    setReview({ ...review });
  }

  function updateReviewRating(value: number) {
    review.success = { ...review.success, rating: value };
    setReview({ ...review });
  }

  function onSubmit(event: Event) {
    event.preventDefault();
    switch (((event as SubmitEvent).submitter as HTMLFormElement).name) {
      case "create": createReview(); break;
      case "update": updateReview(); break;
      case "delete": deleteReview(); break;
    }
  }

  if (isGetLoading) return <Loading />;
  if (isGetError && review.fail.statusCode !== 422) return <Error message={review.fail.message} />;

  return (
    <form class="flex flex-col" onSubmit={onSubmit}>
      <textarea
        class="p-1 px-2 mb-1 rounded shadow-sm resize-none w-70 bg-nord1 hover:bg-nord3 focus:bg-nord3 focus:outline-none"
        placeholder="Прекрасный фильм, не правда ли?"
        maxLength={1000} rows={5} required
        onInput={e => updateReviewText((e.target as HTMLTextAreaElement).value)}
        value={review.success?.review ? review.success.review : ""}
      />
      <div class="flex flex-row mb-1">
        <input
          class="flex justify-center text-center rounded shadow-sm basis-2/12 bg-nord2 hover:bg-nord3 focus:bg-nord3 focus:outline-none me-1"
          placeholder="Оценка"
          type="number" min="0" max="10" step="0.1" size={3} required
          onInput={(e) => updateReviewRating(Number((e.target as HTMLInputElement).value))}
          value={review.success?.rating ? review.success.rating : ""}
        />
        {
          review?.success?.id !== undefined ?
            <>
              <button name="update" type="submit" class="w-full bg-nord2 hover:bg-nord3 rounded p-1">
                <div class="flex flex-row justify-center m-auto">
                  {isUpdateLoading && <LoadingSvg size={17} />}
                  Обновить
                </div>
              </button>
              <div class="me-1" />
              <button name="delete" type="submit" class="w-full bg-nord2 hover:bg-nord3 rounded p-1">
                <div class="flex flex-row justify-center m-auto">
                  {isDeleteLoading && <LoadingSvg size={17} />}
                  Удалить
                </div>
              </button>
            </>
            :
            <button name="create" type="submit" class="w-full bg-nord2 hover:bg-nord3 rounded p-1">
              <div class="flex flex-row justify-center m-auto">
                {isCreateLoading && <LoadingSvg size={17} />}
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
  const [page, setPage] = useState(1);
  const { call, response, isLoading, isError } = useGetReviewsRequest(
    { movieId: id, page },
    () => { },
    error => toast.error(error.message),
  );

  useEffect(() => call(), [page, changed]);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={response.fail.message} />;

  return (
    <div>
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
      {response.success.reviews.map(r => <ReviewCard {...r} {...r.user} userId={r.user.id} />)}
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
    </div>
  );
}

