import { createContext } from "react";
import type { State } from "../data.ts";

export const CommentsContext = createContext<State | null>(null);
