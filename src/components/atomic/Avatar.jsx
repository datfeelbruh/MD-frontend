import Identicon from 'identicon.js';
import { v5 as uuid } from 'uuid';

export default function Avatar({nickname, src = null, size = 28}) {
  return (
    <img class="rounded" width={size} height={size} src={src === null ? generateRandomAvatar(nickname, size) : src} />
  );
}

function generateRandomAvatar(nickname, size) {
  const randomString = uuid(nickname, uuid.URL);
  const b64Avatar = new Identicon(randomString, size).toString();
  return `data:image/png;base64,${b64Avatar}`;
}