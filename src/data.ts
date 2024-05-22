import commentsData from "../data.json";

type Data = typeof commentsData;
type State = Data["comments"];
type CommentType = State[number];
type ReplyType = CommentType["replies"][number];

type Action = 
    | {type: "new", comment: Omit<CommentType, "id">}
    | {type: "edit", id: number, content: string, parentId?: number}
    | {type: "delete", id: number, parentId?: number}
    | {type: "new__reply", parentId: number, reply: Omit<ReplyType, "id">}
    | {type: "change__score", id: number, parentId?: number, by: number}
    | {type: "sort"}
  

export default commentsData;
export type {State, CommentType, ReplyType, Action};