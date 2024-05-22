import React from "react";
import DeleteIcon from "../../../images/icon-delete.svg?react";
import EditIcon from "../../../images/icon-edit.svg?react";
import ReplyIcon from "../../../images/icon-reply.svg?react";

import "../../CSS/ActionButton.css";

interface ActionButtonProps {
  type: "reply" | "edit" | "delete";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const iconTypeMapping = {
  reply: <ReplyIcon />,
  edit: <EditIcon />,
  delete: <DeleteIcon />,
};

function ActionButton({ type, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`action-button action-button--${type}`}
    >
      {iconTypeMapping[type]}
      <span className="action-button__text">{type}</span>
    </button>
  );
}

export default ActionButton;
