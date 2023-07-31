import { useEffect, useState } from "preact/hooks";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import ColoredRating from "@atomic/ColoredRating";
import LoadingSvg from "@atomic/LoadingSpin";
import Paginator from "@atomic/Paginator";
import Avatar from "@atomic/Avatar";
import Card from "@atomic/Card";
import { MOVIES_URL } from "@/urls";
import { displayAxiosError } from "@/utils";

export default function User({id}) {
  const [user, setUser] = useState({username: "", movies: [], pages: 1, page: 1});

  useEffect(() => {
    axios
      .get(`${MOVIES_URL.USER_MOVIES(id)}?page=${user.page}`)
      .then((response) => setUser(response.data))
      .catch((error) => displayAxiosError(error));
  }, [user.page]);

  if (!user || Object.keys(user).length <= 4) return (<LoadingSvg />);

  return (
    <div>
      <Header username={user.username} />
      {user.pages > 1 ? <Paginator page={user.page} maxPage={user.pages} setPage={(page) => setUser({...user, page})} /> : null}
      {user.movies.map(m => <Review {...m} />)}
      {user.pages > 1 ? <Paginator page={user.page} maxPage={user.pages} setPage={(page) => setUser({...user, page})} /> : null}
    </div>
  );
}

function Header({username}) {

  return (
    <div class="flex flex-row p-2 mb-2 rounded shadow-sm bg-nord1">
      <Avatar nickname={username} size={128} />
      <div class="flex flex-col w-full ms-2">
        <div class="text-xl">
          {username.toLowerCase().includes("aniki") ? `✿ ${username} ✿` : username}
        </div>
        <div class="w-full h-full rounded">
          возможно тут будет описание!
        </div>
      </div>
    </div>
  );
}

function Review({id, title, releaseYear, posterUrl, review, rating, averageRating}) {
  const Rating = (
    <p class="flex flex-row">
      <ColoredRating rating={rating} />&#160;|&#160;{<ColoredRating rating={averageRating} />}
    </p>
  );

  const Header = (
    <a class="flex flex-row p-1 rounded-t bg-nord2" href={`/movie/${id}`}>
      {title} ({releaseYear}) ({Rating})
    </a>
  );

  return (
    <Card header={Header} imageUrl={posterUrl}>
      <ReactMarkdown>
        {review}
      </ReactMarkdown>
    </Card>
  );
}