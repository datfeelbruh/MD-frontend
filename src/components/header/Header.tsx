import Logo from "./Logo";
import Search from "./Search";
import UserCard, { Direction } from "@components/userCards/UserCard";
import { userStore } from "@stores/userStore";


export default function Header() {
  const user = userStore(state => state.user);

  return (
    <div class="flex flex-row  py-2 bg-nord1 drop-shadow-sm">
      <div class="basis-1/6 ps-2 pt-0.5">
        <Logo />
      </div>
      <div class="basis-4/6">
        <Search />
      </div>
      <div class="basis-1/6 flex justify-end pe-2">
        {
          user !== null ?
            <UserCard direction={Direction.RIGHT} avatarUrl={user.avatar} nickname={user.username} id={user.id} /> :
            <a class="pt-1" href="/login">Log In</a>
        }
      </div>
    </div>
  );
}
