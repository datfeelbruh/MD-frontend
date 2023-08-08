import LoadingSvg from "@components/atomic/LoadingSpin";
import Paginator from "@components/atomic/Paginator";
import ExpandedReviewCard from "@components/reviewCards/ExpandedReviewCard";
import ExpandedUserCard from "@components/userCards/ExpandedUserCard";
import { tokenStore } from "@stores/tokenStore";
import { displayError, get } from "@utils/requests";
import { MOVIES_URL } from "@utils/urls";
import { useState, useMemo, useEffect } from "preact/hooks";


interface UserProps {
  id: number;
}

export default function User({ id }: UserProps) {
  const [user, setUser] = useState({ user: { username: "", avatar: null, about: "" }, movies: [], pages: 1, page: 1 });
  const token = tokenStore(state => state.token);

  const isCurrentUserPage = useMemo(() => {
    return token !== null && JSON.parse(window.atob(token.split(".")[1])).userId == id;
  }, [id])

  useEffect(() => {
    get(`${MOVIES_URL.USER_MOVIES(id)}?user=${user.page}`)
      .then(data => data.json())
      .then(data => setUser(data))
      .catch(error => displayError(error));
  }, [user.page, id]);

  if (user.user.username === "") return <LoadingSvg />;

  return (
    <div>
      {isCurrentUserPage ? <a class="flex rounded bg-nord1 hover:bg-nord2 w-full p-1 mb-1 justify-center" href={`/userSettings/${id}`}>Редактировать профиль</a> : null}
      <ExpandedUserCard {...user.user} />
      <div class="mb-1" />
      {user.pages > 1 ? <Paginator page={user.page} maxPage={user.pages} setPage={(page) => setUser({ ...user, page })} /> : null}
      {user.movies.map(m => <ExpandedReviewCard {...m} />)}
      {user.pages > 1 ? <Paginator page={user.page} maxPage={user.pages} setPage={(page) => setUser({ ...user, page })} /> : null}
    </div>
  );
}

