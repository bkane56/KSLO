import React from 'react';
import Modal from 'react-responsive-modal';
import ScheduleConfirmation from './scheduleConfirmatilon';

const DisplayModal = (props) => {
  // if (props.type === confirm) {
  const isSecondModalOpen = false;
  return (
    <Modal open onClose={props.onClose} little >
      <div>
        <ScheduleConfirmation />
      </div>
    </Modal>
  );
  // }
};

export default DisplayModal;
