import LoadingSvg from "@components/atomic/LoadingSpin";
import { userStore } from "@stores/userStore"
import { displayError, put } from "@utils/requests";
import { USER_URL } from "@utils/urls";
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
  const [loading, setLoading] = useState(false);
  const [user, setUser] = userStore(state => [state.user, state.set]);

  useEffect(() => setAbout(user.about), []);

  function onSubmit(event) {
    event.preventDefault();

    put(USER_URL.CHANGE_ABOUT(user.id), about)
      .then(data => { setLoading(true); return data; })
      .then(data => data.json())
      .then(data => setUser(data))
      .catch(error => displayError(error))
      .then(() => setLoading(false));
  }

  return (
    <form class="flex flex-col gap-1 w-4/6" onSubmit={onSubmit}>
      <textarea
        class="rounded bg-nord1 hover:bg-nord2 focus:bg-nord2 focus:outline-none resize-none p-1 px-2"
        placeholder="Вы не поверите, товарищ следователь..."
        maxLength={1000} rows={5}
        onInput={e => setAbout(e.target.value)}
        value={about}
      >
      </textarea>
      <button type="submit" class="w-full bg-nord2 hover:bg-nord3 rounded p-1">
        <div class="flex flex-row justify-center m-auto">
          {loading && <LoadingSvg size={17} />}
          Обновить описание
        </div>
      </button>
    </form>
  );
}

function AvatarUpdate() {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = userStore(state => [state.user, state.set]);

  function onSubmit(event) {
    event.preventDefault();
    if (avatar === null) return;
    if (avatar.size > 8000000) { toast.error("Слишком большой файл.\nМаксимум 8МБ."); return; }

    const formData = new FormData();
    formData.append("image", avatar);
    
    fetch(USER_URL.UPLOAD_AVATAR, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))?.state?.token}`,
      },
      body: formData,
    })
      .then(data => { setLoading(true); return data; })
      .then(data => data.json())
      .then(data => setUser(data))
      .catch(error => displayError(error))
      .then(() => setLoading(false));
  }

  return (
    <form class="flex flex-col gap-1 w-2/6" onSubmit={onSubmit}>
      <img class="h-auto" height={96} src={avatar === null ? user.avatar : URL.createObjectURL(avatar)} placeholder="Аватар" alt="Аватар" />

      <input type="file" accept=".jpeg,.jpg,.png,.gif" onInput={e => setAvatar(e?.target?.files?.[0])} />
      
      <button type="submit" class="w-full bg-nord2 hover:bg-nord3 rounded p-1">
        <div class="flex flex-row justify-center m-auto">
          {loading && <LoadingSvg size={17} />}
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
