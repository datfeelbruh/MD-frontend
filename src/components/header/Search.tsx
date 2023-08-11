import { displayError, get } from "@utils/requests";
import { MOVIES_URL } from "@utils/urls";
import { useEffect, useState } from "preact/hooks";

export default function Search() {
  const [randomMovie, setRandomMovie] = useState({id: 0, title: ""});
  const [searchState, setSearchState] = useState({ value: "", results: [], searched: false });

  useEffect(() => {
    const pickRandom = movies => movies[Math.floor(Math.random() * movies.length)];
    get(MOVIES_URL.RANDOM_TITLE, false)
      .then(data => data.json())
      .then(data => setRandomMovie(pickRandom(data)))
      .catch(error => displayError(error));
  }, [searchState.results]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => search(), 600);
    return () => clearTimeout(delayedSearch);
  }, [searchState.value])

  function search() {
    if (!searchState.value || searchState.value.length === 0) return;
    get(`${MOVIES_URL.SEARCH}?title=${encodeURI(searchState.value)}`)
      .then(data => data.json())
      .then(data => setSearchState({ ...searchState, results: data.movies }))
      .catch(error => displayError(error));
  }

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
              <a class="flex justify-center mt-1 w-full rounded shadow-sm bg-nord1 hover:bg-nord3" href={`/search/${encodeURI(searchState.value)}`}>
                Полный поиск
              </a>
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

