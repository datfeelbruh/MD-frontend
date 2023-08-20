import useMovieSearchRequest from "@api/movie/movieSearchRequest";
import NothingFinded from "@components/atomic/NothingFinded";
import Paginator from "@components/atomic/Paginator";
import ExpandedMovieCard from "@components/movieCards/ExpandedMovieCard";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
import { useEffect, useState } from "preact/hooks"

interface TitleSearchProps {
  title: string;
}

export default function TitleSearch({ title }: TitleSearchProps) {
  const [page, setPage] = useState(1);
  const [findKp, setFindKp] = useState(false);
  const { call, response, isLoading, isError } = useMovieSearchRequest({ title, page, findKp, expanded: true }, data => {
    console.debug("request done");
    if (data?.movies?.length === 0 && !findKp) {
      setFindKp(true);
    }
  });

  function search() {
    if (isError) return;
    if (findKp) console.debug("-cash PoroSad");
    call();
  }

  useEffect(() => search(), [title, page, findKp]);

  if (isLoading) return <Loading />;
  if (isError) return <Error message={response.fail.message} />

  return (
    <div class="flex flex-col gap-1">
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
      {response.success.movies.map(m => <ExpandedMovieCard {...m} />)}
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
    </div>
  );
}
