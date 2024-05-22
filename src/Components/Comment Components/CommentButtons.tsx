import { useCurrentUser } from "../../Hooks/useCurrentUser";
import ActionButton from "../Low Level Components/ActionButton";

interface CommentButtonsProps {
  username: string;
  onDelete: () => void;
  onEdit: () => void;
  onReply: () => void;
}

function CommentButtons({
  username,
  onDelete,
  onEdit,
  onReply,
}: CommentButtonsProps) {
  const currentUser = useCurrentUser();
  const isCurrentUserComment = username === currentUser.username;

  let buttons;

  if (isCurrentUserComment) {
    buttons = (
      <>
        <ActionButton type="delete" onClick={onDelete} />
        <ActionButton type="edit" onClick={onEdit} />
      </>
    );
  } else {
    buttons = <ActionButton type="reply" onClick={onReply} />;
  }

  return <span className="comment__buttons">{buttons}</span>;
}

export default CommentButtons;
