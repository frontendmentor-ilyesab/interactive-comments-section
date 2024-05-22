import "../CSS/Modal.css";

interface ModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

function Modal({ onCancel, onConfirm }: ModalProps) {
  function handleOverlayClick(e: React.MouseEvent<HTMLElement>) {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }

  return (
    <section className="modal" onClick={handleOverlayClick}>
      <article className="modal__content">
        <h2 className="modal__title">Delete comment</h2>
        <p className="modal__desc">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modal__buttons">
          <button onClick={onCancel} className="modal__buttons__cancel">
            No, cancel
          </button>
          <button onClick={onConfirm} className="modal__buttons__confirm">
            Yes, delete
          </button>
        </div>
      </article>
    </section>
  );
}

export default Modal;
