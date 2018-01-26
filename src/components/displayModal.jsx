import React from 'react';
import Modal from 'react-responsive-modal';
import ScheduleConfirmation from './scheduleConfirmatilon';
import '../style/modal.css';

const DisplayModal = props => (
  <Modal
    open
    onClose={props.onClose}
    little
    classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
  >
    <div>
      <ScheduleConfirmation
        onClose={props.onClose}
        title={props.title}
        nNumber={props.nNumber}
        slot={props.slot}
        showCloseIcon={false}
      />
    </div>
  </Modal>
);

export default DisplayModal;
