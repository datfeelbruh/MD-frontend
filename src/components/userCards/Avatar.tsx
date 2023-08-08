import Identicon from "identicon.js";
import md5 from "js-md5";

interface AvatarProps {
  size?: number;
  nickname: string;
  url: string | null;
}

const defaultSize = 28;

export default function Avatar({ size = defaultSize, nickname, url = null }: AvatarProps) {
  return (
    <img
      class="rounded"
      width={size}
      height={size}
      src={url === null ? generateAvatar(size, nickname) : url}
    />
  );
}

function generateAvatar(size: number = defaultSize, nickname: string): string {
  const hashNick = md5(nickname);
  const b64Avatar = new Identicon(hashNick, size).toString();
  return `data:image/png;base64,${b64Avatar}`;
}
