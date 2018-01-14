import React from 'react';
import Modal from 'react-responsive-modal';

const DisplayModal = (props) => {
  // if (props.type === confirm) {
  const isSecondModalOpen = false;
  return (
    <Modal open onClose={props.onClose} little >
      <div>
        <p>First modal</p>
      </div>
    </Modal>
  );
  // }
};

export default DisplayModal;
