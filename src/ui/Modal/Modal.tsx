import React from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = (params: ModalProps) => {
  if (!params.isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={() => params.onClose(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => params.onClose(false)}>
          &times;
        </button>
        {params.children}
      </div>
    </div>
  );
};

export default Modal;
