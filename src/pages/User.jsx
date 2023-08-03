import { useEffect, useMemo, useState } from "preact/hooks";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import ColoredRating from "@atomic/ColoredRating";
import LoadingSvg from "@atomic/LoadingSpin";
import Paginator from "@atomic/Paginator";
import Avatar from "@atomic/Avatar";
import Card from "@atomic/Card";
import { MOVIES_URL } from "@/urls";
import { displayAxiosError, getToken } from "@/utils";

export default function User({ id }) {
  const [user, setUser] = useState({ user: {}, movies: [], pages: 1, page: 1 });

  const isCurrentUserPage = useMemo(() => {
    const token = getToken();
    const isTokenExist = token !== null;
    return isTokenExist && JSON.parse(window.atob(token.split(".")[1])).userId == id;
  }, [id]);

  useEffect(() => {
    axios
      .get(`${MOVIES_URL.USER_MOVIES(id)}?page=${user.page}`)
      .then((response) => setUser(response.data))
      .catch((error) => displayAxiosError(error));
  }, [user.page, id]);

  if (!user || Object.keys(user).length <= 4) return (<LoadingSvg />);

  return (
    <div>
      {isCurrentUserPage ? <a class="flex rounded bg-nord1 hover:bg-nord2 w-full p-1 mb-2 justify-center" href={`/userSettings/${id}`}>Редактировать профиль</a> : null}
      <Header user={user.user} />
      {user.pages > 1 ? <Paginator page={user.page} maxPage={user.pages} setPage={(page) => setUser({ ...user, page })} /> : null}
      {user.movies.map(m => <Review {...m} />)}
      {user.pages > 1 ? <Paginator page={user.page} maxPage={user.pages} setPage={(page) => setUser({ ...user, page })} /> : null}
    </div>
  );
}

function Header({ user }) {

  return (
    <div class="flex flex-row p-2 mb-2 rounded shadow-sm bg-nord1">
      <Avatar nickname={user.username} src={user?.avatar} size={128} />
      <div class="flex flex-col w-full ms-2">
        <div class="text-xl">
          {user.username.toLowerCase().includes("aniki") ? `✿ ${user.username} ✿` : user.username}
        </div>
        <div class="w-full h-full rounded">
          {user.about === null ? `Нам ничего не известно об ${user.username}.` : user.about}
        </div>
      </div>
    </div>
  );
}

function Review({ id, title, releaseYear, posterUrl, review, rating, averageRating }) {
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
