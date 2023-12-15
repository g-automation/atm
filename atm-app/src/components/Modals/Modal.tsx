import "./stylesModal.css";

import React from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isVisible: boolean;
  toggleVisibility: () => void;
  modalContent: React.ReactNode;
};

export const Modal = ({
  isVisible,
  toggleVisibility,
  modalContent,
}: ModalProps) => {
  const modal = (
    <>
      <div className="backdrop" onClick={toggleVisibility}></div>
      <div
        className="modal"
        aria-modal
        aria-label="Modal Details"
        role="dialog"
      >
        {modalContent}

        <span
          className="modal-close"
          aria-label="Close Modal Details"
          onClick={toggleVisibility}
        >
          &times;
        </span>
      </div>
    </>
  );

  return isVisible ? createPortal(modal, document.body) : null;
};
