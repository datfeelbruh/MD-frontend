import { RESET_PASSWORD_URL } from "@/urls";
import axios from "axios";
import { toast } from "react-toastify";
import { useMemo, useState } from "preact/hooks";
import { useForm } from "react-hook-form";
import { displayAxiosError } from "@/utils";
import FormButton from "@atomic/FormButton";
import FormInput from "@atomic/FormInput";

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
    <div class="flex justify-center">
      {
        token !== undefined ?
          <SendNewPassword token={token} /> :
          <SendMail />
      }
    </div>
  );
}


function SendMail() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    setLoading(true);

    axios
      .get(RESET_PASSWORD_URL.SEND_MAIL(encodeURI(data.email)))
      .then(response => {
        toast.success("Сообщение отправлено")
        setLoading(false);
      })
      .catch(error => {
        displayAxiosError(error);
        setLoading(false);
      });
  }

  return (
    <form class="flex flex-col p-1 rounded bg-nord1" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <FormInput type="email" placeholder="email" register={register} />
      <FormButton text="Отправить сообщение" isLoading={loading} />
    </form>
  );
}

function SendNewPassword({ token }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    setLoading(true);

    axios
      .post(RESET_PASSWORD_URL.RESET(token), { password: data.password })
      .then(response => {
        toast.success("Пароль обновлён")
        setLoading(false);
      })
      .catch(error => {
        displayAxiosError(error);
        setLoading(false);
      });
  }

  return (
    <form class="flex flex-col p-1 rounded bg-nord1" onSubmit={handleSubmit(data => onSubmit(data))}>
      <FormInput type="password" placeholder="new password" registerName="password" register={register} />
      <FormButton text="Обновить пароль" isLoading={loading} />
    </form>
  );
}
