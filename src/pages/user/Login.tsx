import useLoginRequest from "@api/auth/loginRequest";
import LoadingSvg from "@components/atomic/LoadingSpin";
import { tokenStore } from "@stores/tokenStore";
import { useState } from "preact/hooks";
import { toast } from "react-toastify";

export default function Login() {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const setToken = tokenStore(state => state.set);

  const { call, isLoading } = useLoginRequest(
    formState,
    data => {
      window.location.replace(window.origin);
      setToken(data.accessToken);
    },
    error => toast.error(error.message),
  );

  function onSubmit(event: Event) {
    event.preventDefault();
    call();
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
            onInput={(e) => setFormState({ ...formState, username: (e.target as HTMLInputElement).value })}
          />
          <input
            class="w-full bg-nord2 hover:bg-nord3 focus:bg-nord3 rounded p-0.5 px-2 outline-none placeholder:text-nord9"
            type="password"
            required
            placeholder="password"
            autocomplete="password"
            value={formState.password}
            onInput={(e) => setFormState({ ...formState, password: (e.target as HTMLInputElement).value })}
          />
          <button type="submit" class="w-full mt-1 bg-nord2 hover:bg-nord3 rounded p-0.5">
            <div class="flex flex-row justify-center m-auto">
              {isLoading && <LoadingSvg size={17} />}
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
