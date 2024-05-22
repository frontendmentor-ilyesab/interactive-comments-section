import "../../CSS/PostButton.css";

interface PostButtonProps {
  text: "send" | "update" | "reply";
}

function PostButton({ text }: PostButtonProps) {
  return <button className="post-button">{text}</button>;
}

export default PostButton;
