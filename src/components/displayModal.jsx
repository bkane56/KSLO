import React from 'react';
import Modal from 'react-responsive-modal';
import ScheduleConfirmation from './scheduleConfirmatilon';

const DisplayModal = (props) => {
  return (
    <Modal open onClose={props.onClose} little >
      <div>
        <ScheduleConfirmation
          onClose={props.onClose}
          title={props.title}
          nNumber={props.nNumber}
          slot={props.slot}
        />
      </div>
    </Modal>
  );
};

export default DisplayModal;
