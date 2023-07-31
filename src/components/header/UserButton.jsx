import Avatar from "@/components/atomic/Avatar";

export default function UserButton({ user }) {
  return (
    <a class="flex flex-row justify-end basis-1/6 pe-2" href={`/user/${user.userId}`}>
      <div class="my-auto pe-2 hover:text-nord7">{user.sub}</div>
      <div class="my-auto">
        <Avatar nickname={user.sub} />
      </div>
    </a>
  );
};