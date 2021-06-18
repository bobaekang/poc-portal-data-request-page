import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Button from '../components/Button';
import SimpleInputField from '../components/SimpleInputField';
import { createEmptyCohort, stringifyFilters } from '../ExplorerCohort/utils';

/**
 * @param {object} prop
 * @param {string} prop.title
 * @param {React.ReactNode} prop.children
 * @param {React.MouseEventHandler} prop.onClose
 */
function ExtraFormLayout({ title, children, onClose }) {
  return (
    <div className="data-request-form__extra">
      <span className="data-request-form__extra__close" onClick={onClose}>
        ✕
      </span>
      <h2 className="data-request-form__extra__title">{title}</h2>
      {children}
    </div>
  );
}

ExtraFormLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClose: PropTypes.func,
};

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
      <form
        onKeyDown={(e) => {
          e.preventDefault();
          switch (e.key) {
            case 'Enter':
              isAddAllowed && handleAddCohort();
              break;
            case 'Escape':
              onClose();
          }
        }}
      >
        <SimpleInputField
          label="Name"
          input={
            <Select
              options={[emptyOption, ...options]}
              value={selected}
              autoFocus
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
      filters: PropTypes.arrayOf(PropTypes.object),
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
      <form onKeyDown={(e) => e.preventDefault()}>
        <SimpleInputField
          label="Name"
          input={
            <Select
              options={options}
              value={selected}
              autoFocus
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
      filters: PropTypes.arrayOf(PropTypes.object),
      id: PropTypes.number,
    }),
  ),
  onClose: PropTypes.func,
};
