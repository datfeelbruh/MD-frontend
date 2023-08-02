import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import ColoredRating from "@atomic/ColoredRating";
import FormButton from "@atomic/FormButton";
import LoadingSvg from "@atomic/LoadingSpin";
import Paginator from "@atomic/Paginator";
import Avatar from "@atomic/Avatar";
import Card from "@atomic/Card";
import { MOVIES_URL, REVIEW_URL } from "@/urls";
import { displayAxiosError, getToken } from "@/utils";
import RatingFooter from "@/components/RatingFooter";


export default function Movie({id}) {
  return (
    <div>
      <Header movieId={id} />
      <RevewForm movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}

function Header({movieId}) {
  const [movie, setMovie] = useState({title: "", releaseYear: 0, averageRating: 0, kpRating: 0, imdbRating: 0, posterUrl: "", description: ""});

  useEffect(() => {
    axios
      .get(MOVIES_URL.BY_ID(movieId), { headers: { "Authorization": `Bearer ${getToken()}` } })
      .then((response) => setMovie(response.data))
      .catch((error) => displayAxiosError(error));
  }, [movieId]);

  if (movie.releaseYear === 0) return (<LoadingSvg />);

  const Header = (
    <div class="flex flex-row w-full text-lg">
      <p class="basis-1/2 ms-1">
        {movie.title} ({movie.releaseYear})
      </p>
    </div>
  );

  const Yohoho = (
    <a class="flex justify-center py-1 w-full rounded shadow-sm bg-nord2 hover:bg-nord3" href={`https://4h0y.gitlab.io/#${movieId}`}>
      yohoho
    </a>
  );

  return (
    <Card header={Header} imageUrl={movie.posterUrl} imageInfo={Yohoho}>
      <div class="flex flex-col h-full">
        <div class="h-full">{movie.description}</div>
        <RatingFooter kpRating={movie.kpRating} kgRating={movie.averageRating} imdbRating={movie.imdbRating} />
      </div>
   </Card>
  );
}

function RevewForm({movieId}) {
  // бог покинул этот компонент, оставь все надежды, читающий.
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState({movieId, id: 0, review: "", rating: undefined});
  
  const token = getToken();
  const auth = {headers: {"Authorization": `Bearer ${token}`}};

  useEffect(() => {
    const userId = JSON.parse(window.atob(token.split(".")[1])).userId;
    axios
      .get(`${REVIEW_URL.SEARCH}?userId=${userId}&movieId=${movieId}&limit=1`, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => setReview({...response.data.userReview, id: response.data.id}))
      .catch((error) => error?.response?.status !== 422 && displayAxiosError(error));
  }, [movieId]);

  function onSubmit(e) {
    e.preventDefault();

    if (e.submitter.name === "create") {
      request(axios.post(REVIEW_URL.CREATE, review, auth));
    }

    if (e.submitter.name === "update") {
      request(axios.put(REVIEW_URL.UPDATE(review.id), review, auth))
    }
  }

  function delete_() {
    request(axios.delete(REVIEW_URL.DELETE(review.id), auth));
  }

  function request(method) {
    setLoading(true);

    method
      .then((response) => {
        toast.success(response.data);
        setReview({...response.data?.userReview, id: response.data.id});
        setLoading(false);
      })
      .catch((error) => {
        displayAxiosError(error);
        setLoading(false);
      });
  }

  return (
    <form class="flex flex-col" onSubmit={onSubmit}>
      <textarea
        class="p-1 px-2 mb-1 rounded shadow-sm resize-none w-70 bg-nord1 hover:bg-nord3 focus:bg-nord3 focus:outline-none"
        placeholder="Прекрасный фильм, не правда ли?"
        maxLength={1000} rows={5} required
        onInput={(e) => setReview({...review, review: e.target.value})}
      >{review?.review}</textarea>
      <div class="flex flex-row mb-1">
        <input
          class="flex justify-center text-center rounded shadow-sm basis-2/12 bg-nord2 hover:bg-nord3 focus:outline-none me-1"
          placeholder="Оценка"
          type="number" min="0" max="10" step="0.1" size={3} required
          onInput={(e) => setReview({...review, rating: e.target.value})}
          value={review?.rating}
        />
        { review?.id ?
        <>
          <FormButton text="Обновить" name="update" isLoading={loading} />
          <div class="me-1"/> 
          <FormButton text="Удалить" type="button" isLoading={loading} onClick={delete_} />
        </> :
        <FormButton text="Создать" name="create" isLoading={loading} />
        }
      </div>
    </form>
  );
}

function ReviewList({userId = null, movieId = null}) {
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState({pages: 0, reviews: []});

  useEffect(() => {
    const url = new URL(REVIEW_URL.SEARCH, window.location.origin);
    userId && url.searchParams.set("userId", userId);
    movieId && url.searchParams.set("movieId", movieId);

    axios
      .get(url.toString(), { headers: { "Authorization": `Bearer ${getToken()}` } })
      .then((response) => setResponse(response.data))
      .catch((error) => displayAxiosError(error));
  }, [page]);

  return (
    <>
      {response?.pages > 1 ? <Paginator page={page} maxPage={response.pages} setPage={setPage} /> : null}
      {Object.keys(response).length !== 2 ? response.reviews.map(r => <Review {...r} />) : <LoadingSvg />}
      {response?.pages > 1 ? <Paginator page={page} maxPage={response.pages} setPage={setPage} /> : null}
    </>
  );
}

function Review({id, userId, username, userReview, className = "bg-nord1"}) {
  return (
    <div className={`flex flex-col p-2 mb-1 w-full break-words rounded shadow-sm text ${className}`} key={id}>
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
