import { useEffect } from "react";
import type { State } from "../data.ts";

export function useLocalStorage(comments: State) {
  useEffect(() => {
    window.localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);
}
