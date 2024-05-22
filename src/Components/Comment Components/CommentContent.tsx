import TextArea from "../Low Level Components/TextArea";
import PostButton from "../Low Level Components/PostButton";

import React, { useState } from "react";

interface CommentContentProps {
  isEditing: boolean;
  replyingTo?: string;
  content: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, text: string) => void;
}

function CommentContent({
  isEditing,
  replyingTo,
  content,
  onSubmit,
}: CommentContentProps) {
  const [text, setText] = useState(
    replyingTo !== undefined ? `@${replyingTo} ${content}` : content
  );

  let mainContent;

  if (!isEditing) {
    mainContent = (
      <p className="comment__content">
        {replyingTo !== undefined ? (
          <span className="comment__replyingTo">@{replyingTo} </span>
        ) : (
          ""
        )}
        {content}
      </p>
    );
  } else {
    mainContent = (
      <form
        className="comment__content edit-comment"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e, text)}
      >
        <TextArea
          autofocus={true}
          text={text}
          onChange={(e) => setText(e.target.value)}
        />
        <PostButton text="update" />
      </form>
    );
  }
  return mainContent;
}

export default CommentContent;
