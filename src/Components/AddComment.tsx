import { useCurrentUser } from "../Hooks/useCurrentUser";
import { useCommentsDispatch } from "../Hooks/useCommentsDispatch";
import "../CSS/AddComment.css";

import TextArea from "./Low Level Components/TextArea";
import PostButton from "./Low Level Components/PostButton";

import { useState } from "react";

type AddCommentProps =
  | { type: "comment" }
  | {
      type: "reply";
      parentId: number;
      replyingTo: string;
      callback: () => void;
    };

function AddComment(props: AddCommentProps) {
  const [text, setText] = useState(
    props.type === "reply" ? `@${props.replyingTo}. ` : ""
  );

  const currentUser = useCurrentUser();
  const commentsDispatch = useCommentsDispatch();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const textArea = form.textarea;
    if (textArea.checkValidity()) {
      if (props.type === "comment") {
        const newContent = text.trim();
        if (newContent !== "") {
          setText("");
          commentsDispatch({
            type: "new",
            comment: {
              content: text.trim(),
              createdAt: new Date().toJSON(),
              score: 0,
              user: currentUser,
              replies: [],
            },
          });
        }
      } else {
        const newContent = text.replace(`@${props.replyingTo}. `, "").trim();
        if (newContent !== "") {
          commentsDispatch({
            type: "new__reply",
            parentId: props.parentId,
            reply: {
              content: newContent,
              createdAt: new Date().toJSON(),
              score: 0,
              user: currentUser,
              replyingTo: props.replyingTo,
            },
          });
        }
        props.callback();
      }
    }
  }

  return (
    <form className="add-comment" onSubmit={handleSubmit}>
      <TextArea
        autofocus={props.type === "reply" ? true : undefined}
        text={text}
        onChange={(e) => setText(e.target.value)}
      />
      <picture>
        <source srcSet={currentUser.image.webp} type="image/webp" />
        <img
          className="add-comment__image"
          src={currentUser.image.png}
          alt={`${currentUser.username}'s Profile Image`}
        />
      </picture>
      <PostButton text={props.type === "comment" ? "send" : "reply"} />
    </form>
  );
}

export default AddComment;
