import useMovieSearchRequest from "@api/movie/movieSearchRequest";
import useRandomTitleRequest from "@api/movie/randomTitleRequest";
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-toastify";

export default function Search() {
  const [randomMovie, setRandomMovie] = useState({ id: 0, title: "" });
  const [searchState, setSearchState] = useState({ value: "", results: [], searched: false });

  const { call: callSearch } = useMovieSearchRequest(
    { title: searchState.value, page: 1 },
    data => setSearchState({ ...searchState, results: data.movies }),
    error => toast.error(error.message),
  );

  const { call: callRandomTitle } = useRandomTitleRequest(
    data => setRandomMovie(data[Math.floor(Math.random() * data.length)]),
    error => toast.error(error.message),
  );

  useEffect(() => callRandomTitle(), [searchState.results]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => searchState?.value?.length !== undefined && searchState.value.length !== 0 && callSearch(), 600);
    return () => clearTimeout(delayedSearch);
  }, [searchState.value])

  function onEnter() {
    if (!searchState.value || searchState.value.length === 0) {
      window.location.href = `/movie/${randomMovie.id}`;
    } else {
      window.location.href = `/search/${encodeURI(searchState.value)}`;
    }
  }

  return (
    <div class="m-auto w-full">
      <input
        class="p-1 w-full text-center rounded bg-nord2 placeholder:text-center placeholder:text-nord9 hover:bg-nord3 focus:bg-nord3 focus:outline-none"
        type="text"
        placeholder={`Давай посмотрим... ${randomMovie.title}?`}
        value={searchState.value}
        onInput={(e) => setSearchState({ ...searchState, value: e.target.value })}
        onFocus={() => setSearchState({ ...searchState, searched: true })}
        onKeyDown={(e) => e.key == "Enter" && onEnter()}
      />
      {searchState.searched &&
        <div class="absolute bottom-0 left-0 top-0 w-full h-max" onClick={() => setSearchState({ ...searchState, searched: false })}>
          <div class="flex pt-12 flex-col h-screen bg-origin-content bg-black/10">
            <div class="flex flex-col mx-auto w-4/6">
              <ul>
                {searchState.results.map(m => <SearchCard {...m} />)}
              </ul>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

interface SearchCardProps {
  id: number;
  title: string;
  releaseYear: number;
}

function SearchCard({ id, title, releaseYear }: SearchCardProps) {
  return (
    <li class="bg-nord2 hover:bg-nord3 first:rounded-t first:mt-1 last:rounded-b py-0.5" key={id}>
      <a class="flex flex-row mx-2" href={`/movie/${id}`}>
        {title} ({releaseYear})
      </a>
    </li>
  );
}

