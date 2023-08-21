import useGetMailRequest, { useResetpasswordRequest } from "@api/auth/resetPasswordRequest";
import LoadingSvg from "@components/atomic/LoadingSpin";
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
  const { call, isLoading } = useResetpasswordRequest(
    { token },
    { password: formState.password },
    () => window.location.replace(`${window.origin}/login`),
    error => toast.error(error.message),
  );

  function onSubmit(event: Event) {
    event.preventDefault();
    call();
  }

  useEffect(() => {
    const passwordsEquals = formState.password === formState.confirmPassword;
    const message = passwordsEquals ? "" : "Пароли не совпадают";

    (document
      .getElementById("confirm_password") as HTMLInputElement)
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
        onInput={(e) => setFormState({ ...formState, password: (e.target as HTMLInputElement).value })}
      />
      <input
        class="w-full bg-nord2 hover:bg-nord3 focus:bg-nord3 rounded p-0.5 px-2 outline-none placeholder:text-nord9"
        type="password"
        required
        placeholder="confim password"
        autocomplete="new-password"
        id="confirm_password"
        value={formState.confirmPassword}
        onInput={(e) => setFormState({ ...formState, confirmPassword: (e.target as HTMLInputElement).value })}
      />
      <button type="submit" class="w-full mt-1 bg-nord2 hover:bg-nord3 rounded p-0.5">
        <div class="flex flex-row justify-center m-auto">
          {isLoading && <LoadingSvg size={17} />}
          Сменить пароль
        </div>
      </button>
    </form>
  );
}

function SendMail() {
  const [formState, setFormState] = useState({ email: "" });
  const { call, isLoading } = useGetMailRequest(
    formState,
    () => toast.success("Письмо отправлено"),
    error => toast.error(error.message),
  );

  function onSubmit(event: Event) {
    event.preventDefault();
    call();
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
        onInput={(e) => setFormState({ ...formState, email: (e.target as HTMLInputElement).value })}
      />
      <button type="submit" class="w-full mt-1 bg-nord2 hover:bg-nord3 rounded p-0.5">
        <div class="flex flex-row justify-center m-auto">
          {isLoading && <LoadingSvg size={17} />}
          Отправить Письмо
        </div>
      </button>
    </form>
  );
}
