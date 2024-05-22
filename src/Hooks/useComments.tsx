import { useContext } from "react";
import { CommentsContext } from "../Context/CommentsContext";

export function useComments() {
  const comments = useContext(CommentsContext);
  if (!comments) {
    throw new Error("useComments must be used within a Context Provider");
  }
  return comments;
}
