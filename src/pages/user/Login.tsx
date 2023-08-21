import useLoginRequest from "@api/auth/loginRequest";
import Form from "@components/atomic/form/Form";
import FormButton from "@components/atomic/form/FormButton";
import FormInput from "@components/atomic/form/FormInput";
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
    <div class="flex flex-col justify-center w-96 mx-auto">
      <Form onSubmit={onSubmit}>
        <FormInput
          value={formState.username}
          onInput={t => setFormState({ ...formState, username: t.value })}
          placeholder="username" autocomplete
        />
        <FormInput
          value={formState.password}
          onInput={t => setFormState({ ...formState, password: t.value })}
          placeholder="password" autocomplete
        />
        <FormButton
          isLoading={isLoading}
          text="Войти"
        />
        <div class="flex flex-row gap-2 justify-center">
          <a class="basis-1/2 text-center hover:underline cursor-pointer text-nord4" href="/register">
            Зарегистрироваться
          </a>
          <a class="basis-1/2 text-center hover:underline cursor-pointer text-nord4" href="/resetPassword">
            Забыл пароль
          </a>
        </div>
      </Form>
    </div>
  );
}
