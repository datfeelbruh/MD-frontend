import LoadingSvg from "@components/atomic/LoadingSpin";
import { tokenStore } from "@stores/tokenStore";
import { displayError, post } from "@utils/requests";
import { AUTH_URL } from "@utils/urls";
import { useState } from "preact/hooks";

export default function Login() {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const setToken = tokenStore(state => state.set);

  function onSubmit(event) {
    event.preventDefault();
    post(AUTH_URL.LOGIN, formState, false)
      .then(data => { setLoading(true); return data; })
      .then(data => data.json())
      .then(data => {
        window.location.href = window.origin;
        setToken(data.accessToken);
      })
      .catch(error => displayError(error))
      .then(() => setLoading(false));
  }

  return (
    <div class="flex flex-col justify-center">
      <div class="flex flex-col w-96 m-auto p-2 rounded bg-nord1">
        <form class="flex flex-col gap-1" onSubmit={onSubmit}>
          <input
            class="w-full bg-nord2 hover:bg-nord3 focus:bg-nord3 rounded p-0.5 px-2 outline-none placeholder:text-nord9"
            type="text"
            required
            placeholder="username"
            autocomplete="username"
            value={formState.username}
            onInput={(e) => setFormState({ ...formState, username: e.target.value })}
          />
          <input
            class="w-full bg-nord2 hover:bg-nord3 focus:bg-nord3 rounded p-0.5 px-2 outline-none placeholder:text-nord9"
            type="password"
            required
            placeholder="password"
            autocomplete="password"
            value={formState.password}
            onInput={(e) => setFormState({ ...formState, password: e.target.value })}
          />
          <button type="submit" class="w-full mt-1 bg-nord2 hover:bg-nord3 rounded p-0.5">
            <div class="flex flex-row justify-center m-auto">
              {loading && <LoadingSvg size={17} />}
              Войти
            </div>
          </button>
        </form>
        <div class="flex flex-row gap-2 justify-center">
          <a class="basis-1/2 text-center hover:underline cursor-pointer text-nord4" href="/register">
            Зарегистрироваться
          </a>
          <a class="basis-1/2 text-center hover:underline cursor-pointer text-nord4" href="/resetPassword">
            Забыл пароль
          </a>
        </div>
      </div>
    </div>
  );
}
