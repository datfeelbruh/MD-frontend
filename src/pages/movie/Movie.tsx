import useMovieRequest from "@api/movie/movieRequest";
import useCreateReviewRequest from "@api/review/createReviewRequest";
import useDeleteReviewRequest from "@api/review/deleteReviewRequest";
import useGetReviewsRequest, { useGetUserReviewRequest } from "@api/review/getReviewsRequest";
import useUpdateReviewRequest from "@api/review/updateReviewRequest";
import Paginator from "@components/atomic/Paginator";
import Form from "@components/atomic/form/Form";
import FormButton from "@components/atomic/form/FormButton";
import FormInput from "@components/atomic/form/FormInput";
import FormTexarea from "@components/atomic/form/FormTextarea";
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

  // can't set it to number, bc parseFloat("N.") => N
  // idk what to do PoroSad
  function updateReviewRating(value) {
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
    <Form onSubmit={onSubmit}>
      <FormTexarea
        value={review?.success?.review ? review.success.review : ""}
        onInput={t => updateReviewText(t.value)}
        placeholder="Прекрасный фильм, не правда ли?" maxLength={1000} rows={5}
      />
      <div class="flex flex-row">
        <FormInput
          value={review?.success?.rating ? review.success.rating : ""}
          onInput={t => updateReviewRating(t.value)}
          placeholder="Оценка" type="number" min={0} max={10} step={0.1} size={3} w="basis-1/12 text-center placeholder-center"
        />
        <div class="p-0.5" />
        {
          review?.success?.id !== undefined ?
            <>
              <FormButton
                isLoading={isUpdateLoading}
                text="Обновить"
                name="update"
              />
              <div class="px-0.5" />
              <FormButton
                isLoading={isDeleteLoading}
                text="Удалить"
                name="delete"
              />
            </>
            :
            <FormButton
              isLoading={isCreateLoading}
              text="Создать"
              name="create"
            />
        }
      </div>
    </Form>
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
    <div class="mt-1">
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
      {response.success.reviews.map(r => <ReviewCard {...r} {...r.user} userId={r.user.id} />)}
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
    </div>
  );
}

