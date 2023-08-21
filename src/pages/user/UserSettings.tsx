import useUpdateAboutRequest from "@api/user/updateAboutRequest";
import useUpdateAvatarRequest from "@api/user/updateAvatarRequest";
import LoadingSvg from "@components/atomic/LoadingSpin";
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
    <div class="flex flex-row gap-2">
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
    <form class="flex flex-col gap-1 w-4/6" onSubmit={onSubmit}>
      <textarea
        class="rounded bg-nord1 hover:bg-nord2 focus:bg-nord2 focus:outline-none resize-none p-1 px-2"
        placeholder="Вы не поверите, товарищ следователь..."
        maxLength={1000} rows={5}
        onInput={e => setAbout((e.target as HTMLInputElement).value)}
        value={about}
      >
      </textarea>
      <button type="submit" class="w-full bg-nord2 hover:bg-nord3 rounded p-1">
        <div class="flex flex-row justify-center m-auto">
          {isLoading && <LoadingSvg size={17} />}
          Обновить описание
        </div>
      </button>
    </form>
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
    <form class="flex flex-col gap-1 w-2/6" onSubmit={onSubmit}>
      <img
        id="avatar_preview"
        class="h-auto"
        height={96}
        src={user.avatar}
        placeholder="Аватар"
        alt="Аватар"
      />
      <input
        type="file"
        accept=".jpeg,.jpg,.png,.gif"
        onInput={
          e => {
            (document.getElementById("avatar_preview") as HTMLImageElement).src = URL.createObjectURL((e.target as HTMLInputElement).files[0]);
            formData.set("image", (e.target as HTMLInputElement).files[0]);
            setFormData(formData);
          }
        }
      />
      <button type="submit" class="w-full bg-nord2 hover:bg-nord3 rounded p-1">
        <div class="flex flex-row justify-center m-auto">
          {isLoading && <LoadingSvg size={17} />}
          Обновить аватар
        </div>
      </button>
    </form>
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
