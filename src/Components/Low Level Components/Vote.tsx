import PlusIcon from "../../../images/icon-plus.svg?react";
import MinusIcon from "../../../images/icon-minus.svg?react";
import "../../CSS/Vote.css";

import { useCommentsDispatch } from "../../Hooks/useCommentsDispatch";

interface VoteProps {
  id: number;
  parentId?: number;
  score: number;
}

function Vote({ id, parentId, score }: VoteProps) {
  const commentsDispatch = useCommentsDispatch();

  function handleIncrement() {
    commentsDispatch({
      type: "change__score",
      id: id,
      parentId: parentId,
      by: 1,
    });
  }

  function handleDecrement() {
    commentsDispatch({
      type: "change__score",
      id: id,
      parentId: parentId,
      by: -1,
    });
  }
  return (
    <div className="vote">
      <button onClick={handleIncrement} className="vote__plus-button">
        <PlusIcon />
      </button>
      <span className="vote__score">{score}</span>
      <button onClick={handleDecrement} className="vote__minus-button">
        <MinusIcon />
      </button>
    </div>
  );
}

export default Vote;
