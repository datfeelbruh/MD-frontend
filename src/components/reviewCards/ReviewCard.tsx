import ColoredRating from "@components/atomic/ColoredRating"
import Avatar from "@components/userCards/Avatar";
import ReactMarkdown from "react-markdown";

interface UserReview {
  rating: number;
  review: string;
}

interface ReviewCardProps {
  id: number;
  userId: number;
  username: string;
  avatar: string | null;
  userReview: UserReview;
}

export default function ReviewCard({ id, userId, username, avatar, userReview }: ReviewCardProps) {
  return (
    <div class="flex flex-col p-2 mb-1 w-full break-words rounded shadow-sm bg-nord2" key={id}>
      <a class="mb-1 hover:text-nord4" href={`/user/${userId}`}>
        <div class="flex flex-row gap-2">
          <Avatar nickname={username} url={avatar} />
          <p class="flex flex-row gap-1">{username} (<ColoredRating rating={userReview.rating} />)</p>
        </div>
      </a>
      <ReactMarkdown>
        {userReview.review}
      </ReactMarkdown>
    </div>
  );
}
