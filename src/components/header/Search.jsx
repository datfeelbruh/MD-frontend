import axios from "axios";
import Popup from "reactjs-popup";
import { useEffect, useState } from "preact/hooks";
import { MOVIES_URL } from "@/urls";
import { displayAxiosError, getToken } from "@/utils";

export default function Search() {
  const [randomTitle, setRandomTitle] = useState("");
  const [searchState, setSearchState] = useState({ value: "", results: [], searched: false });

  useEffect(() => {
    let getRandomTitle = (titles) => titles[Math.floor(Math.random() * titles.length)];

    axios
      .get(`${MOVIES_URL.RANDOM_TITLE}`, { headers: { "Authorization": `Bearer ${getToken()}` } })
      .then(response => setRandomTitle(getRandomTitle(response.data.moviesTitles)))
      .catch(error => displayAxiosError(error));
  }, [searchState.results]);

  const search = () => {
    if (!searchState.value) return;

    axios
      .get(`${MOVIES_URL.SEARCH}?title=${searchState.value}`, { headers: { "Authorization": `Bearer ${getToken()}` } })
      .then(response => setSearchState({ ...searchState, results: response.data.movies, searched: true }))
      .catch(error => displayAxiosError(error));
  }

  return (
    <div class="m-auto w-auto basis-4/6">
      <input
        class="p-1 w-full text-center rounded bg-nord2 placeholder:text-center placeholder:text-nord9 hover:bg-nord3 focus:bg-nord3 focus:outline-none"
        type="text"
        placeholder={`Давай посмотрим... ${randomTitle}?`}
        onKeyDown={(e) => e.key == "Enter" && search()}
        onInput={(e) => setSearchState({ ...searchState, value: e.target.value })}
        onFocus={() => searchState.results && setSearchState({ ...searchState, searched: true })}
      />
      <Popup open={searchState.searched} lockScroll overlayStyle={{ display: "block", position: "fixed", top: "48px", backgroundColor: "#0d0d1469" }} onClose={() => setSearchState({ ...searchState, searched: false })}>
        <div class="flex px-1 mx-auto w-4/6">
          <div class="w-full">
            <ul class="shadow-sm">
              {searchState.results.map(m => <SearchCard {...m} />)}
            </ul>
            {searchState.value &&
              <a class="flex justify-center mt-1 w-full rounded shadow-sm bg-nord1 hover:bg-nord3 text-nord6" href={`/search/${searchState.value}`}>
                Полный поиск
              </a>}
          </div>
        </div>
      </Popup>
    </div>
  );
}

function SearchCard({ id, title, releaseYear }) {
  return (
    <li class="text-nord6 bg-nord2 hover:bg-nord3 first:rounded-t first:mt-2 last:rounded-b">
      <a class="block w-full h-full p-0.5 mx-1" href={`/movie/${id}`} key={id}>
        {title} ({releaseYear})
      </a>
    </li>
  );
}
