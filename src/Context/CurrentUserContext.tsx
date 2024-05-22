import { createContext } from "react";
import commentsData from "../data.ts";

export const CurrentUserContext = createContext(commentsData.currentUser);
