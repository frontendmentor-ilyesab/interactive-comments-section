import "../../CSS/TextArea.css";

interface TextAreaProps {
  text: string;
  autofocus?: true;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

function TextArea({ text, autofocus, onChange }: TextAreaProps) {
  function handleFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
    const textarea = e.currentTarget;
    textarea.selectionStart = textarea.value.length;
  }

  return (
    <textarea
      className="textarea"
      placeholder="Add a comment..."
      name="textarea"
      id="textarea"
      value={text}
      onChange={onChange}
      autoFocus={autofocus ?? false}
      onFocus={handleFocus}
      spellCheck="false"
      required
    ></textarea>
  );
}

export default TextArea;
