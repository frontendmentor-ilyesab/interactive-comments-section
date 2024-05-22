import { createContext } from "react";
import type { Action } from "../data.ts";

export const CommentsDispatchContext =
  createContext<React.Dispatch<Action> | null>(null);
