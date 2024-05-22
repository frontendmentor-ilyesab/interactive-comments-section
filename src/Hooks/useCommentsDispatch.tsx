import { useContext } from "react";
import { CommentsDispatchContext } from "../Context/CommentsDispatchContext";

export function useCommentsDispatch() {
  const commentsDispatch = useContext(CommentsDispatchContext);
  if (!commentsDispatch) {
    throw new Error(
      "useCommentsDispatch must be used within a Context Provider"
    );
  }
  return commentsDispatch;
}
