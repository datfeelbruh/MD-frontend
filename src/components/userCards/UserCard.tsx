import Avatar from "./Avatar"

export enum Direction {
  LEFT,
  RIGHT
}

interface UserCardProps {
  direction?: Direction;
  nickname: string;
  id: number;
  avatarUrl: string | null;
}

export default function UserCard({ direction = Direction.LEFT, nickname, id, avatarUrl = null }: UserCardProps) {
  return (
    <a class="flex flex-row gap-2 hover:text-nord7 cursor-pointer my-auto" href={`/user/${id}`}>
      <div class="my-auto">{direction === Direction.LEFT && <Avatar nickname={nickname} url={avatarUrl} />}</div>
      <div class="pt-0.5">{nickname}</div>
      <div class="my-auto">{direction === Direction.RIGHT && <Avatar nickname={nickname} url={avatarUrl} />}</div>
    </a>
  );
}
