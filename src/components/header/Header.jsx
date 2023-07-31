import Auth from "./Auth";
import Logo from "./Logo";
import Search from "./Search";
import UserButton from "./UserButton";

export default function Header({user, setToken}) {
  return (
    <div class="flex flex-row p-2 drop-shadow-sm bg-nord1">
      <Logo />
      <Search />
      {user !== undefined ? <UserButton user={user} /> : <Auth setToken={setToken} />}
    </div>
  );
}