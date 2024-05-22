import Comment from "./Comment";
import type { CommentType } from "../data.ts";
import "../CSS/CommentWithReplies.css";

interface CommentWithRepliesProps {
  comment: CommentType;
}

function CommentWithReplies({ comment }: CommentWithRepliesProps) {
  const replies = comment.replies.map((reply) => {
    return (
      <Comment
        key={reply.id}
        id={reply.id}
        user={reply.user}
        createdAt={reply.createdAt}
        content={reply.content}
        score={reply.score}
        parentId={comment.id}
        replyingTo={reply.replyingTo}
      />
    );
  });

  const repliesContainer = <div className="replies">{replies}</div>;

  return (
    <>
      <Comment
        id={comment.id}
        user={comment.user}
        createdAt={comment.createdAt}
        content={comment.content}
        score={comment.score}
      />
      {comment.replies.length > 0 && repliesContainer}
    </>
  );
}

export default CommentWithReplies;
