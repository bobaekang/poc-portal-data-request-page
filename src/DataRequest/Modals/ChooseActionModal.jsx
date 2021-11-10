import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import { ModalLayout } from '../Layouts';

/**
 * @param {object} prop
 * @param {() => void} prop.onClose
 * @param {(actionType: ReviewerActionType) => void} prop.onSubmit
 */
export default function ChooseActionModal({ onClose, onSubmit }) {
  const [actionType, setActionType] = useState(null);
  function handleProceedAction() {
    onSubmit(actionType);
    onClose();
  }

  return (
    <ModalLayout
      title="Choose action for the current Data Request"
      onClose={onClose}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          margin: '0 auto',
        }}
      >
        <div style={{ margin: '1rem' }}>
          <input
            style={{ marginRight: '1rem' }}
            type="radio"
            id="approve"
            name="drone"
            value="APPROVE"
            checked={actionType === 'APPROVE'}
            onChange={() => setActionType('APPROVE')}
          />
          <label htmlFor="approve">Approve</label>
        </div>
        <div style={{ margin: '1rem' }}>
          <input
            style={{ marginRight: '1rem' }}
            type="radio"
            id="reject"
            name="drone"
            value="REJECT"
            checked={actionType === 'REJECT'}
            onChange={() => setActionType('REJECT')}
          />
          <label htmlFor="reject">Reject</label>
        </div>
        <div style={{ margin: '1rem' }}>
          <input
            style={{ marginRight: '1rem' }}
            type="radio"
            id="request-update"
            name="drone"
            value="REQUEST_UPDATE"
            checked={actionType === 'REQUEST_UPDATE'}
            onChange={() => setActionType('REQUEST_UPDATE')}
          />
          <label htmlFor="request-update">Request update</label>
        </div>
      </form>
      <div className="data-request-form__button-group">
        <Button
          buttonType="primary"
          enabled={actionType !== null}
          label="Proceed"
          onClick={handleProceedAction}
        />
      </div>
    </ModalLayout>
  );
}

ChooseActionModal.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
