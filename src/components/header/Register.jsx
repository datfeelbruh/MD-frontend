import axios from "axios";
import { useState } from "preact/hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { USER_URL } from "@/urls";
import { displayAxiosError } from "@/utils";
import FormInput from "@atomic/FormInput";
import FormButton from "@atomic/FormButton";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    setLoading(true);

    axios
      .post(USER_URL.REGISTER, data)
      .then(() => toast.success("Пользователь зарегистрирован"))
      .catch((error) => displayAxiosError(error))
      .finally(() => setLoading(false));
  }

  return (
    <Popup trigger={<button class="me-3 hover:text-nord7">Register</button>} position="bottom left" offsetX={-136} arrow={false}>
      <form class="p-3 mt-3 rounded w-70 bg-nord1" onSubmit={handleSubmit((data) => onSubmit(data))}>
        <FormInput type="text" placeholder="username" register={register} /><br />
        <FormInput type="email" placeholder="email" register={register} /><br />
        <FormInput type="password" placeholder="password" register={register} /><br />
        <FormInput type="password" placeholder="password" register={register} registerName="confirmPassword" /><br />
        <FormButton text="Зарегистрироваться" isLoading={loading} />
      </form>
    </Popup>
  );
}
