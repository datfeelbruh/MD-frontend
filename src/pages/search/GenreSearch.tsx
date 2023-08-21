import { toast } from 'react-toastify';
import useGenreSearchRequest from "@api/movie/genreSearchRequest";
import NothingFinded from "@components/atomic/NothingFinded";
import Paginator from "@components/atomic/Paginator";
import ExpandedMovieCard from "@components/movieCards/ExpandedMovieCard";
import { useEffect, useState } from "preact/hooks"
import Loading from '@pages/Loading';
import Error from '@pages/Error';

interface GenreSearchProps {
  genre: string;
}

export default function GenreSearch({ genre }: GenreSearchProps) {
  const [page, setPage] = useState(1);
  const { call, response, isLoading, isError } = useGenreSearchRequest(
    {genreName: genre, page},
    () => {},
    error => toast.error(error.message)
  );

  useEffect(() => call(), [page, genre]);
  
  if (isLoading) return <Loading />;
  if (isError) return <Error message={response.fail.message} />;
  if (response.success.movies.length === 0) return <NothingFinded />;

  return (
    <div class="flex flex-col gap-1">
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
      {response.success.movies.map(m => <ExpandedMovieCard {...m} />)}
      {response.success.pages > 1 ? <Paginator page={response.success.page} maxPage={response.success.pages} setPage={setPage} /> : null}
    </div>
  );
}
