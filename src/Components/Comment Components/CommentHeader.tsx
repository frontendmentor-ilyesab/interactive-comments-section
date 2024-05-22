import Badge from "../Low Level Components/Badge";
import TimeStamp from "../Low Level Components/TimeStamp";

import { useCurrentUser } from "../../Hooks/useCurrentUser";

import { memo } from "react";

import imgUrls from "../../imgUrls";

interface CommentHeaderProps {
  user: {
    image: {
      webp: string;
      png: string;
    };
    username: string;
  };
  createdAt: string;
}

const CommentHeader = memo(function CommentHeader({
  user,
  createdAt,
}: CommentHeaderProps) {
  const currentUser = useCurrentUser();
  const isCurrentUserComment = user.username === currentUser.username;
  return (
    <header className="comment__header">
      <picture>
        <source srcSet={imgUrls[user.image.webp]} type="image/webp" />
        <img
          className="comment__image"
          src={imgUrls[user.image.png]}
          alt={`${user.username}'s Profile Image`}
        />
      </picture>
      <h2 className="comment__username">
        <span>{user.username}</span>
        {isCurrentUserComment ? <Badge /> : ""}
      </h2>
      <TimeStamp createdAt={createdAt} />
    </header>
  );
});

export default CommentHeader;
