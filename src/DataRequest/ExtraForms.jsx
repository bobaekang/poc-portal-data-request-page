import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Button from '../components/Button';
import SimpleInputField from '../components/SimpleInputField';
import { createEmptyCohort, stringifyFilters } from '../ExplorerCohort/utils';
import { ExtraFormLayout } from './Layouts';

/**
 * @param {object} prop
 * @param {ExplorerCohort[]} prop.cohorts
 * @param {(id: number) => void} prop.onAddCohort
 * @param {() => void} prop.onClose
 */
export function CohortAddForm({ cohorts, onAddCohort, onClose }) {
  const emptyOption = {
    label: 'Open New (no cohort)',
    value: createEmptyCohort(),
  };
  const options = cohorts.map((cohort) => ({
    label: cohort.name,
    value: cohort,
  }));
  const [selected, setSelected] = useState(emptyOption);
  const isAddAllowed = selected.value.name !== emptyOption.value.name;

  function handleAddCohort() {
    onAddCohort(selected.value.id);
    setSelected(emptyOption);
  }
  return (
    <ExtraFormLayout title="Select a saved Cohort to add" onClose={onClose}>
      <form onSubmit={(e) => e.preventDefault()}>
        <SimpleInputField
          label="Name"
          input={
            <Select
              options={[emptyOption, ...options]}
              value={selected}
              clearable={false}
              onChange={(e) => setSelected(e)}
            />
          }
        />
        <SimpleInputField
          label="Description"
          input={
            <textarea
              disabled
              placeholder="No description"
              value={selected.value.description}
            />
          }
        />
        <SimpleInputField
          label="Filters"
          input={
            <textarea
              disabled
              placeholder="No filters"
              value={stringifyFilters(selected.value.filters)}
            />
          }
        />
      </form>
      <div className="data-request-form__button-group">
        <Button
          buttonType="secondary"
          enabled={isAddAllowed}
          label="Add Cohort"
          onClick={handleAddCohort}
        />
      </div>
    </ExtraFormLayout>
  );
}

CohortAddForm.propTypes = {
  cohorts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      filters: PropTypes.object,
      id: PropTypes.number,
    }),
  ),
  onAddCohort: PropTypes.func,
  onClose: PropTypes.func,
};

/**
 * @param {object} prop
 * @param {ExplorerCohort[]} prop.cohorts
 * @param {() => void} prop.onClose
 */
export function CohortDetailsForm({ cohorts, onClose }) {
  const options = cohorts.map((cohort) => ({
    label: cohort.name,
    value: cohort,
  }));
  const [selected, setSelected] = useState(options[0]);

  return (
    <ExtraFormLayout title="Details on a selected Cohort" onClose={onClose}>
      <form onSubmit={(e) => e.preventDefault()}>
        <SimpleInputField
          label="Name"
          input={
            <Select
              options={options}
              value={selected}
              clearable={false}
              onChange={(e) => setSelected(e)}
            />
          }
        />
        <SimpleInputField
          label="Description"
          input={
            <textarea
              disabled
              placeholder="No description"
              value={selected.value.description}
            />
          }
        />
        <SimpleInputField
          label="Filters"
          input={
            <textarea
              disabled
              placeholder="No filters"
              value={stringifyFilters(selected.value.filters)}
            />
          }
        />
      </form>
    </ExtraFormLayout>
  );
}

CohortDetailsForm.propTypes = {
  cohorts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      filters: PropTypes.object,
      id: PropTypes.number,
    }),
  ),
  onClose: PropTypes.func,
};

/**
 * @param {object} prop
 * @param {DataRequest} prop.request
 * @param {() => void} prop.onClose
 * @param {(attributes: *) => void} prop.onSubmit
 */
export function ConsortiumRequestForm({ request, onClose, onSubmit }) {
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
    <ExtraFormLayout
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
    </ExtraFormLayout>
  );
}

ConsortiumRequestForm.propTypes = {
  request: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

/**
 * @param {object} prop
 * @param {() => void} prop.onClose
 * @param {(actionType: ReviewerActionType) => void} prop.onSubmit
 */
export function ChooseActionForm({ onClose, onSubmit }) {
  const [actionType, setActionType] = useState(null);
  function handleProceedAction() {
    onSubmit(actionType);
    onClose();
  }

  return (
    <ExtraFormLayout
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
    </ExtraFormLayout>
  );
}

ChooseActionForm.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
