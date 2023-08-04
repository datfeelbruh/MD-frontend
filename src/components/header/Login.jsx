import { useState } from "preact/hooks";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";
import axios from "axios";
import { AUTH_URL } from "@/urls";
import { displayAxiosError } from "@/utils";
import FormInput from "@atomic/FormInput";
import FormButton from "@atomic/FormButton";

export default function Login({ setToken }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    setLoading(true);

    axios
      .post(AUTH_URL.LOGIN, data)
      .then((response) => setToken(response.data.accessToken))
      .catch((error) => displayAxiosError(error))
      .finally(() => setLoading(false));
  }

  return (
    <Popup trigger={<button class="me-3 hover:text-nord7">Login</button>} position="bottom left" offsetX={-86} arrow={false}>
      <form class="p-3 mt-3 rounded w-70 bg-nord1" onSubmit={handleSubmit((data) => onSubmit(data))}>
        <FormInput type="text" placeholder="username" register={register} /><br />
        <FormInput type="password" placeholder="password" register={register} /><br />
        <FormButton text="Войти" isLoading={loading} />
        <a class="flex justify-center w-full mt-1 text-nord6 p-1 bg-nord2 hover:bg-nord3" href="/resetPassword">Забыл пароль</a>
      </form>
    </Popup>
  );
}
