import FormButton from "@atomic/FormButton";
import { USER_URL } from "@/urls";
import { displayAxiosError, getToken } from "@/utils";
import axios from "axios";
import { useMemo, useState } from "preact/hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UserSettings({ id }) {
  const token = getToken();

  const isCurrentUserPage = useMemo(() => {
    const isTokenExist = token !== null;
    return isTokenExist && JSON.parse(window.atob(token.split(".")[1])).userId == id;
  }, [id]);


  if (!isCurrentUserPage) return (
    <h1 class="bg-nord1 p-1 rounded">
      Идет прапорщик по танковой части - видит, что боец с молотком на палец стоит дует.<br />
      - В чем дело?<br />
      - Да вот гвоздь забивал, по пальцу попал.<br />
      - Кто-ж так бьет?! Смотри как надо!<br />
      Берет гвоздь и лбом его по самую шляпу в стену вгоняет.<br />
      Боец офигевает от такого и спрашивает:<br />
      - Т. пропорщик, а в бетонную стену можете?<br />
      - Да без вопросов!<br />
      Берет гвоздь и опять по шляпу в стену лбом загоняет.<br />
      Боец еще больше офигевает, но не отстает:<br />
      - Т. прапорщик, а в броню можете?<br />
      - Да без проблем!<br />
      Берет гвоздь и в танк лбом по гвоздю лупит. Гвоздь гнется но не лезет. Прапор берет второй гвоздь, опять бьет, и опять гвоздь гнется. Тут прапор не выдерживает, лезет в танк, а там - другой прапор спит и головой к броне прислонился.<br />
    </h1>
  );

  return (
    <div class="flex flex-col gap-2">
      <AvatarUpdate />
      <AboutUpdate id={id} />
    </div>
  );
}

function AboutUpdate({ id }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    axios.put(USER_URL.CHANGE_ABOUT(id), data, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(response => {
        toast.success("Изменено успешно");
        setLoading(false);
      })
      .catch(error => {
        displayAxiosError(error)
        setLoading(false);
      });
  }

  return (
    <form class="flex flex-col gap-1" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <textarea
        class="rounded bg-nord1 hover:bg-nord2 focus:bg-nord2 focus:outline-none resize-none p-1 px-2"
        placeholder="Вы не поверите, товарищ следователь..."
        maxLength={1000} rows={5}
        {...register("about")}
      >
      </textarea>
      <FormButton text="Обновить описание" isLoading={loading} />
    </form>
  );
}

function AvatarUpdate() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  function onSubmit(data) {
    if (data?.avatar?.[0] === undefined) return;
    if (data.avatar[0].size < 8192) {
      toast.error("Слишком большой файл.\nМаксимум 8МБ.");
      return;
    }

    const form = new FormData();
    form.append("image", data.avatar[0]);

    axios.post(USER_URL.UPLOAD_AVATAR, form, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(response => {
        toast.success("Изменено успешно");
        setLoading(false);
      })
      .catch(error => {
        displayAxiosError(error)
        setLoading(false);
      });
  }

  return (
    <form class="flex flex-col gap-1" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <input type="file" accept=".jpeg,.jpg,.png,.gif" {...register("avatar")} />
      <FormButton text="Обновить аватарку" isLoading={loading} />
    </form>
  );
}
