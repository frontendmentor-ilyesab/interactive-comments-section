import CommentWithReplies from "./Components/CommentWithReplies.tsx";
import AddComment from "./Components/AddComment.tsx";

import { useComments } from "./Hooks/useComments.tsx";
import { useSortedComments } from "./Hooks/useSortedComments.tsx";
import { useLocalStorage } from "./Hooks/useLocalStorage.tsx";

function App() {
  const comments = useComments();
  useSortedComments();
  useLocalStorage(comments);

  const content = comments.map((comment) => {
    return <CommentWithReplies key={comment.id} comment={comment} />;
  });

  return (
    <main className="main">
      <h1 className="visually-hidden">Interactive Comments Section</h1>
      {content}
      <AddComment type="comment" />
    </main>
  );
}

export default App;
