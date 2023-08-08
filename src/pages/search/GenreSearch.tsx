import LoadingSvg from "@components/atomic/LoadingSpin";
import NothingFinded from "@components/atomic/NothingFinded";
import Paginator from "@components/atomic/Paginator";
import ExpandedMovieCard from "@components/movieCards/ExpandedMovieCard";
import { displayError, get } from "@utils/requests";
import { MOVIES_URL } from "@utils/urls";
import { useEffect, useState } from "preact/hooks"

interface GenreSearchProps {
  genre: string;
}

export default function GenreSearch({ genre }: GenreSearchProps) {
  const [response, setResponse] = useState({ page: 1, pages: 1, movies: [] });
  const [loading, setLoading] = useState(false);

  function search() {
    get(`${MOVIES_URL.BY_GENRE}?genreName=${encodeURI(genre)}&page=${response.page}`)
      .then(data => { setLoading(true); return data; })
      .then(data => data.json())
      .then(data => setResponse(data))
      .catch(error => displayError(error))
      .then(() => setLoading(false));
  }

  useEffect(() => search(), [response.page, genre]);

  if (loading) return <LoadingSvg />;
  if (response.movies.length === 0) return <NothingFinded />;

  return (
    <div class="flex flex-col gap-1">
      {response.pages > 1 ? <Paginator page={response.page} maxPage={response.pages} setPage={page => setResponse({ ...response, page })} /> : null}
      {response.movies.map(m => <ExpandedMovieCard {...m} />)}
      {response.pages > 1 ? <Paginator page={response.page} maxPage={response.pages} setPage={page => setResponse({ ...response, page })} /> : null}
    </div>
  );
}
