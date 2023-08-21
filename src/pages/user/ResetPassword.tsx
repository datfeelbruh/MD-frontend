import useGetMailRequest, { useResetpasswordRequest } from "@api/auth/resetPasswordRequest";
import Form from "@components/atomic/form/Form";
import FormButton from "@components/atomic/form/FormButton";
import FormInput from "@components/atomic/form/FormInput";
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
    <div class="flex flex-col justify-center w-96 mx-auto rounded bg-nord1">
      {token !== undefined ?
        <SendNewPassword token={token} /> :
        <SendMail />
      }
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
    <Form onSubmit={onSubmit}>
      <FormInput
        value={formState.password}
        onInput={t => setFormState({ ...formState, password: t.value })}
        placeholder="password" autocomplete="new-password" type="password"
      />
      <FormInput
        value={formState.confirmPassword}
        onInput={t => setFormState({ ...formState, confirmPassword: t.value })}
        placeholder="confirm password" autocomplete="new-password" type="password"
      />
      <FormButton
        isLoading={isLoading}
        text="Сменить пароль"
      />
    </Form>
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
    <Form onSubmit={onSubmit}>
      <FormInput
        value={formState.email}
        onInput={t => setFormState({ ...formState, email: t.value })}
        placeholder="email" autocomplete type="email"
      />
      <FormButton
        isLoading={isLoading}
        text="Отправить письмо"
      />
    </Form>
  );
}
