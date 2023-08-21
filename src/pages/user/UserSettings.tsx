import useUpdateAboutRequest from "@api/user/updateAboutRequest";
import useUpdateAvatarRequest from "@api/user/updateAvatarRequest";
import LoadingSvg from "@components/atomic/LoadingSpin";
import Form from "@components/atomic/form/Form";
import FormButton from "@components/atomic/form/FormButton";
import FormInput from "@components/atomic/form/FormInput";
import FormTexarea from "@components/atomic/form/FormTextarea";
import { userStore } from "@stores/userStore"
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-toastify";

interface UserSettingsProps {
  id: number
}

export default function UserSetting({ id }: UserSettingsProps) {
  const user = userStore(state => state.user);

  if (user.id !== Number(id)) return <Joke />;

  return (
    <div class="flex flex-row gap-2 w-full">
      <AvatarUpdate />
      <UpdateAbout />
    </div>
  );
}

function UpdateAbout() {
  const [about, setAbout] = useState(null);
  const [user, setUser] = userStore(state => [state.user, state.set]);
  const { call, isLoading } = useUpdateAboutRequest(
    user.id,
    { about },
    data => setUser(data),
    error => toast.error(error.message),
  );

  useEffect(() => setAbout(user.about), []);

  function onSubmit(event: Event) {
    event.preventDefault();
    call();
  }

  return (
    <div class="w-4/6">
      <Form onSubmit={onSubmit}>
        <FormTexarea
          value={about}
          onInput={t => setAbout(t.value)}
          placeholder="Вы не поверите, товарищ следователь..." maxLength={1000} rows={5}
        />
        <FormButton
          isLoading={isLoading}
          text="Обновить описание"
        />
      </Form>
    </div>
  );
}

function AvatarUpdate() {
  const [formData, setFormData] = useState(() => new FormData());
  const [user, setUser] = userStore(state => [state.user, state.set]);
  const { call, isLoading } = useUpdateAvatarRequest(
    formData,
    // reload bc url doesn't change if avatar already exists
    data => { setUser({ ...data }); window.location.reload(); },
    error => toast.error(error.message),
  );

  function onSubmit(event: Event) {
    event.preventDefault();

    if (formData.get("image") === null) return;
    if ((formData.get("image") as Blob).size > 8000000) { toast.error("Слишком большой файл.\nМаксимум 8МБ."); return; }

    call();
  }

  return (
    <div class="w-2/6">
      <Form onSubmit={onSubmit}>
        <img
          id="avatar_preview"
          class="h-auto rounded"
          height={96}
          src={user.avatar}
          placeholder="Аватар"
          alt="Аватар"
        />
        <FormInput
          type="file"
          accept=".jpeg,.jpg,.png,.gif"
          onInput={
            t => {
              (document.getElementById("avatar_preview") as HTMLImageElement).src = URL.createObjectURL(t.files[0]);
              formData.set("image", t.files[0]);
              setFormData(formData);
            }
          }
        />
        <FormButton
          isLoading={isLoading}
          text="Обновить аватар"
        />
      </Form>
    </div>
  );
}



function Joke() {
  return (
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
}
