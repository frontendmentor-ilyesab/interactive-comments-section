import { useCommentsDispatch } from "./useCommentsDispatch";
import { useEffect } from "react";

export function useSortedComments() {
  const commentsDispatch = useCommentsDispatch();
  useEffect(() => {
    commentsDispatch({ type: "sort" });
  }, [commentsDispatch]);
}
