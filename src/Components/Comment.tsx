import Vote from "./Low Level Components/Vote";
import Modal from "./Modal";
import AddComment from "./AddComment";
import CommentHeader from "./Comment Components/CommentHeader";
import CommentContent from "./Comment Components/CommentContent";
import CommentButtons from "./Comment Components/CommentButtons";
import "../CSS/Comment.css";

import { useCommentsDispatch } from "../Hooks/useCommentsDispatch";

import { useState } from "react";

interface CommentProps {
  id: number;
  user: {
    image: {
      webp: string;
      png: string;
    };
    username: string;
  };
  createdAt: string;
  content: string;
  score: number;
  parentId?: number;
  replyingTo?: string;
}

type State = "normal" | "edit" | "delete" | "reply";

function Comment({
  id,
  user,
  createdAt,
  content,
  score,
  parentId,
  replyingTo,
}: CommentProps) {
  const [state, setState] = useState<State>("normal");

  const commentsDispatch = useCommentsDispatch();

  function handleReplyClick() {
    setState("reply");
  }

  function handleEditClick() {
    setState("edit");
  }

  function handleDeleteClick() {
    setState("delete");
  }

  function handleModalCancel() {
    setState("normal");
  }

  function handleModalConfirm() {
    commentsDispatch({
      type: "delete",
      id: id,
      parentId: parentId,
    });
    setState("normal");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, text: string) {
    e.preventDefault();
    const form = e.currentTarget;
    const textarea = form.textarea;
    const newContent = text.replace(`@${replyingTo}`, "").trim();
    if (textarea.checkValidity() && newContent !== content) {
      commentsDispatch({
        type: "edit",
        id: id,
        content: newContent,
        parentId: parentId,
      });
    }
    setState("normal");
  }

  const comment = (
    <>
      <article
        style={{ zIndex: state === "edit" ? 2 : "auto" }}
        className="comment"
      >
        <CommentHeader user={user} createdAt={createdAt} />
        <CommentContent
          isEditing={state === "edit"}
          replyingTo={replyingTo}
          content={content}
          onSubmit={handleSubmit}
        />
        <Vote id={id} parentId={parentId} score={score} />
        <CommentButtons
          username={user.username}
          onDelete={handleDeleteClick}
          onEdit={handleEditClick}
          onReply={handleReplyClick}
        />
        {state === "delete" && (
          <Modal onCancel={handleModalCancel} onConfirm={handleModalConfirm} />
        )}
      </article>
      {state === "edit" && (
        <div onClick={() => setState("normal")} className="overlay"></div>
      )}
    </>
  );

  if (state === "reply") {
    return (
      <>
        <section style={{ zIndex: 2 }} className="comment-addreply-container">
          {comment}
          <AddComment
            type="reply"
            parentId={parentId ?? id}
            replyingTo={user.username}
            callback={() => setState("normal")}
          />
        </section>
        <div onClick={() => setState("normal")} className="overlay"></div>
      </>
    );
  } else {
    return comment;
  }
}

export default Comment;
