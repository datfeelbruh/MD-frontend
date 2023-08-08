import LoadingSvg from "@components/atomic/LoadingSpin";
import { displayError, get, post } from "@utils/requests";
import { RESET_PASSWORD_URL } from "@utils/urls";
import { useEffect, useMemo, useState } from "preact/hooks";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const params = useMemo(() => {
    return window.location.search
      .match(/\w+=[a-zA-Z0-9\-]*/g)
      ?.map(paramString => {
        const param = paramString.split("=");
        return { [param[0]]: param[1] };
      })
  }, [window.location.search]);

  const token = useMemo(() => {
    return params?.find(param => param?.token)?.token;
  }, [params]);

  return (
    <div class="flex flex-col justify-center">
      <div class="flex flex-col w-96 m-auto p-2 rounded bg-nord1">
        {token !== undefined ?
          <SendNewPassword token={token} /> :
          <SendMail />
        }
      </div>
    </div>
  );
}

interface SendNewPasswordProps {
  token: string;
}

function SendNewPassword({ token }: SendNewPasswordProps) {
  const [formState, setFormState] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    post(RESET_PASSWORD_URL.RESET(token), { password: formState.password }, false)
      .then(() => setLoading(true))
      .then(() => (window.location.href = `${window.origin}/login`))
      .catch(error => displayError(error))
      .then(() => setLoading(false));
  }

  useEffect(() => {
    const passwordsEquals = formState.password === formState.confirmPassword;
    const message = passwordsEquals ? "" : "Пароли не совпадают";

    document
      .getElementById("confirm_password")
      .setCustomValidity(message);
  }, [formState.confirmPassword, formState.password])

  return (
    <form class="flex flex-col gap-1" onSubmit={onSubmit}>
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
          Сменить пароль
        </div>
      </button>
    </form>
  );
}

function SendMail() {
  const [formState, setFormState] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    get(RESET_PASSWORD_URL.SEND_MAIL(encodeURI(formState.email)), false)
      .then(() => setLoading(true))
      .then(() => toast.success("Письмо отправлено"))
      .catch(error => displayError(error))
      .then(() => setLoading(false));
  }

  return (
    <form class="flex flex-col gap-1" onSubmit={onSubmit}>
      <input
        class="w-full bg-nord2 hover:bg-nord3 focus:bg-nord3 rounded p-0.5 px-2 outline-none placeholder:text-nord9"
        type="email"
        required
        placeholder="email"
        autocomplete="email"
        value={formState.email}
        onInput={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      <button type="submit" class="w-full mt-1 bg-nord2 hover:bg-nord3 rounded p-0.5">
        <div class="flex flex-row justify-center m-auto">
          {loading && <LoadingSvg size={17} />}
          Отправить Письмо
        </div>
      </button>
    </form>
  );
}
