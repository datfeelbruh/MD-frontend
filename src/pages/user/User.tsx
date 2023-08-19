import useUserMoviesRequest from "@api/movie/userMoviesRequest";
import Paginator from "@components/atomic/Paginator";
import ExpandedReviewCard from "@components/reviewCards/ExpandedReviewCard";
import ExpandedUserCard from "@components/userCards/ExpandedUserCard";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { userStore } from "@stores/userStore";
import { useEffect } from "preact/hooks";
import { toast } from "react-toastify";


interface UserProps {
  id: number;
}

export default function User({ id }: UserProps) {
  const currentUserId = userStore(state => state?.user?.id);

  const { call, response, setResponse, isLoading, isError } = useUserMoviesRequest(
    id, { page: 1 }, () => { },
    error => toast.error(error.message)
  );

  const setPage = (page) => {
    response.success.page = page;
    setResponse({ ...response });
  };

  useEffect(() => call(), [response?.success?.page, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={response?.fail?.message} />;

  return (
    <div>
      {currentUserId === Number(id) ? <a class="flex rounded bg-nord1 hover:bg-nord2 w-full p-1 mb-1 justify-center" href={`/userSettings/${id}`}>Редактировать профиль</a> : null}
      <ExpandedUserCard {...response.success.user} />
      <div class="mb-1" />
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
      {response.success.movies.map(m => <ExpandedReviewCard {...m} />)}
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
    </div>
  );
}

