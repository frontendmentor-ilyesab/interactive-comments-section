import { useContext } from "react";
import { CurrentUserContext } from "../Context/CurrentUserContext";

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
