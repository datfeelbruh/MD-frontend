import LoadingSvg from "@components/atomic/LoadingSpin";
import { displayError, post } from "@utils/requests";
import { USER_URL } from "@utils/urls";
import { useEffect, useState } from "preact/hooks";

export default function Register() {
  const [formState, setFormState] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const passwordsEquals = formState.password === formState.confirmPassword;
    const message = passwordsEquals ? "" : "Пароли не совпадают";

    document
      .getElementById("confirm_password")
      .setCustomValidity(message);
  }, [formState.confirmPassword, formState.password])

  function onSubmit(event) {
    event.preventDefault();
    post(USER_URL.REGISTER, formState, false)
      .then(() => setLoading(false))
      .then(() => (window.location.href = `${window.origin}/login`))
      .catch(error => displayError(error))
      .then(() => setLoading(true));
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
            type="email"
            required
            placeholder="email"
            autocomplete="email"
            value={formState.email}
            onInput={(e) => setFormState({ ...formState, email: e.target.value })}
          />
          <input
            class="w-full bg-nord2 hover:bg-nord3 focus:bg-nord3 rounded p-0.5 px-2 outline-none placeholder:text-nord9"
            type="password"
            required
            placeholder="password"
            autocomplete="new-password"
            value={formState.password}
            onInput={(e) => setFormState({ ...formState, password: e.target.value })}
          />
          <input
            class="w-full bg-nord2 hover:bg-nord3 focus:bg-nord3 rounded p-0.5 px-2 outline-none placeholder:text-nord9"
            type="password"
            required
            placeholder="confim password"
            autocomplete="new-password"
            id="confirm_password"
            value={formState.confirmPassword}
            onInput={(e) => setFormState({ ...formState, confirmPassword: e.target.value })}
          />
          <button type="submit" class="w-full mt-1 bg-nord2 hover:bg-nord3 rounded p-0.5">
            <div class="flex flex-row justify-center m-auto">
              {loading && <LoadingSvg size={17} />}
              Зарегистрироваться
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
