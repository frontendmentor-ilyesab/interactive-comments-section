import { useReducer } from "react";
import type { State, Action, CommentType, ReplyType } from "../data.ts";
import commentsData from "../data.ts";

import { CommentsContext } from "../Context/CommentsContext.tsx";
import { CommentsDispatchContext } from "../Context/CommentsDispatchContext.tsx";

interface CommentsProviderProps {
  children: React.ReactElement;
}

const localStorageComments = localStorage.getItem("comments");
let initialState: State;

if (localStorageComments) {
  initialState = JSON.parse(localStorageComments);
} else {
  initialState = commentsData.comments;
}

export default function CommentsProvider({ children }: CommentsProviderProps) {
  const [comments, dispatch] = useReducer(commentsReducer, initialState);
  return (
    <CommentsContext.Provider value={comments}>
      <CommentsDispatchContext.Provider value={dispatch}>
        {children}
      </CommentsDispatchContext.Provider>
    </CommentsContext.Provider>
  );
}

function commentsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "new": {
      const id = getNewId(state);
      return [...state, { id: id, ...action.comment }];
    }
    case "edit": {
      if (action.parentId) {
        return state.map((comment) => {
          if (comment.id === action.parentId) {
            const replies = comment.replies.map((reply) => {
              if (reply.id === action.id) {
                return { ...reply, content: action.content };
              } else {
                return reply;
              }
            });
            return { ...comment, replies: replies };
          } else {
            return comment;
          }
        });
      }
      return state.map((comment) => {
        if (comment.id === action.id) {
          return { ...comment, content: action.content };
        } else {
          return comment;
        }
      });
    }

    case "delete": {
      if (action.parentId) {
        return state.map((comment) => {
          if (comment.id === action.parentId) {
            const replies = comment.replies.filter(
              (reply) => reply.id !== action.id
            );
            return { ...comment, replies: replies };
          } else {
            return comment;
          }
        });
      }
      return state.filter((comment) => comment.id !== action.id);
    }

    case "new__reply": {
      const id = getNewId(state);
      return state.map((comment) => {
        if (comment.id === action.parentId) {
          return {
            ...comment,
            replies: [...comment.replies, { id: id, ...action.reply }],
          };
        } else {
          return comment;
        }
      });
    }

    case "change__score": {
      if (action.parentId) {
        return state.map((comment) => {
          if (comment.id === action.parentId) {
            const replies = comment.replies.map((reply) => {
              if (reply.id === action.id) {
                return { ...reply, score: reply.score + action.by };
              } else {
                return reply;
              }
            });
            return { ...comment, replies: replies };
          } else {
            return comment;
          }
        });
      }

      return state.map((comment) => {
        if (comment.id === action.id) {
          return { ...comment, score: comment.score + action.by };
        } else {
          return comment;
        }
      });
    }

    case "sort": {
      const commentsSorted = state
        .map((comment) => {
          return {
            ...comment,
            replies: comment.replies.slice().sort(sortByDate),
          };
        })
        .sort(sortByScore);
      return commentsSorted;
    }
  }
}

function getNewId(state: State): number {
  let id = 0;
  for (const comment of state) {
    if (comment.id > id) {
      id = comment.id;
      for (const reply of comment.replies) {
        if (reply.id > id) {
          id = reply.id;
        }
      }
    }
  }

  return id + 1;
}

function sortByScore(a: CommentType, b: CommentType): number {
  return b.score - a.score;
}

function sortByDate(a: ReplyType, b: ReplyType): number {
  return Date.parse(a.createdAt) - Date.parse(b.createdAt);
}
