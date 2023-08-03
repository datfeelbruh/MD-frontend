import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import LoadingSvg from "@atomic/LoadingSpin";
import Paginator from "@atomic/Paginator";
import { MOVIES_URL } from "@/urls";
import { displayAxiosError, getToken } from "@/utils";
import MovieSearchCard from "@components/MovieSearchCard";

export default function Search({ title }) {
  const [response, setResponse] = useState({ pages: 0, movies: [] });
  const [page, setPage] = useState(1);

  function search(kp = false) {
    axios
      .get(`${MOVIES_URL.SEARCH}?title=${title}&expanded=true&findKp=${kp}&page=${page}`, { headers: { "Authorization": `Bearer ${getToken()}` } })
      .then((response) => {
        if (response?.data?.movies?.length !== 1) {
          setResponse(response.data);
        } else {
          console.debug("-cash PoroSad");
          search(true);
        }
      })
      .catch((error) => displayAxiosError(error));
  }
  useEffect(() => search(), [page]);

  return (
    <>
      {response?.pages > 1 ? <Paginator page={page} maxPage={response.pages} setPage={setPage} /> : null}
      {response && Object.keys(response).length !== 2 ? response.movies.map(m => <MovieSearchCard {...m} />) : <LoadingSvg />}
      {response?.pages > 1 ? <Paginator page={page} maxPage={response.pages} setPage={setPage} /> : null}
    </>
  );
}
