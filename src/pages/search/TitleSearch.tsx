import LoadingSvg from "@components/atomic/LoadingSpin";
import NothingFinded from "@components/atomic/NothingFinded";
import Paginator from "@components/atomic/Paginator";
import ExpandedMovieCard from "@components/movieCards/ExpandedMovieCard";
import { displayError, get } from "@utils/requests";
import { MOVIES_URL } from "@utils/urls";
import { useEffect, useState } from "preact/hooks"

interface TitleSearchProps {
  title: string;
}

export default function TitleSearch({ title }: TitleSearchProps) {
  const [response, setResponse] = useState({ page: 1, pages: 1, movies: [] });
  const [loading, setLoading] = useState(false);

  function search(kp = false) {
    if (kp) console.debug("-cash PoroSad");

    get(`${MOVIES_URL.SEARCH}?title=${title}&expanded=true&findKp=${kp}&page=${response.page}`)
      .then(data => { setLoading(true); return data; })
      .then(data => data.json())
      .then(data => {
        if (data.movies.length === 0 && !kp) search(!kp);
        else setResponse(data);
      })
      .catch(error => displayError(error))
      .then(() => setLoading(false));
  }

  useEffect(() => search(), [title, response.page]);

  if (loading && response.page === 1) return <LoadingSvg />;
  if (response.movies.length === 0) return <NothingFinded />;

  return (
    <div class="flex flex-col gap-1">
      {response.pages > 1 ? <Paginator page={response.page} maxPage={response.pages} setPage={page => setResponse({ ...response, page })} /> : null}
      {response.movies.map(m => <ExpandedMovieCard {...m} />)}
      {response.pages > 1 ? <Paginator page={response.page} maxPage={response.pages} setPage={page => setResponse({ ...response, page })} /> : null}
    </div>
  );
}
