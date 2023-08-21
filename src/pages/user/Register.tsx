import useRegisterRequest from "@api/user/registerRequest";
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-toastify";
import Form from "../../components/atomic/form/Form";
import FormInput from "../../components/atomic/form/FormInput";
import FormButton from "@components/atomic/form/FormButton";

export default function Register() {
  const [formState, setFormState] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const { call, isLoading } = useRegisterRequest(
    formState,
    () => window.location.replace(`${window.origin}/login`),
    error => toast.error(error.message),
  );

  useEffect(() => {
    const passwordsEquals = formState.password === formState.confirmPassword;
    const message = passwordsEquals ? "" : "Пароли не совпадают";

    (document
      .getElementById("confirm_password") as HTMLInputElement)
      .setCustomValidity(message);
  }, [formState.confirmPassword, formState.password])

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
          value={formState.email}
          onInput={t => setFormState({ ...formState, email: t.value })}
          placeholder="email" autocomplete type="email"
        />
        <FormInput
          value={formState.password}
          onInput={t => setFormState({ ...formState, password: t.value })}
          placeholder="password" autocomplete="new-password" type="password"
        />
        <FormInput
          value={formState.confirmPassword}
          onInput={t => setFormState({ ...formState, confirmPassword: t.value })}
          placeholder="password" autocomplete="new-password" type="password" id="confirm_password"
        />
        <FormButton
          isLoading={isLoading}
          text="Зарегистрироваться"
        />
      </Form>
    </div>
  );
}
