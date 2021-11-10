import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import SimpleInputField from '../../components/SimpleInputField';
import BaseModal from './BaseModal';

/**
 * @param {object} prop
 * @param {DataRequest} prop.request
 * @param {() => void} prop.onClose
 * @param {(attributes: *) => void} prop.onSubmit
 */
export default function ConsortiumRequestModal({ request, onClose, onSubmit }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialValues = {};
  for (const { id, value } of request.attributes) initialValues[id] = value;
  const [values, setValues] = useState(initialValues);

  const isEditable =
    request.state === 'NOT_SUBMITTED' || request.state === 'UPDATE_REQUESTED';
  const changedAttributes = [];
  if (isEditable)
    for (const [id, value] of Object.entries(values))
      if (initialValues[id] !== value) changedAttributes.push({ id, value });

  function handleSubmitChange() {
    onSubmit(changedAttributes);
    setIsSubmitted(true);
  }

  return (
    <BaseModal
      title={
        isSubmitted
          ? `Update is submitted to ${request.consortium}`
          : `Data Request to ${request.consortium}`
      }
      onClose={onClose}
    >
      {isSubmitted ? (
        <p className="">
          You can send a new message to {request.consortium} on this update.
        </p>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          {request.attributes.map((attr) => (
            <SimpleInputField
              key={attr.name}
              label={attr.name}
              input={
                <input
                  value={values[attr.id]}
                  disabled={!isEditable}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [attr.id]: e.target.value,
                    }))
                  }
                />
              }
            />
          ))}
        </form>
      )}
      {isEditable && !isSubmitted && (
        <div className="data-request-form__button-group">
          <Button
            buttonType="primary"
            enabled={changedAttributes.length > 0}
            label="Submit Change"
            onClick={handleSubmitChange}
          />
        </div>
      )}
    </BaseModal>
  );
}

ConsortiumRequestModal.propTypes = {
  request: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
