import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Button from '../../components/Button';
import SimpleInputField from '../../components/SimpleInputField';
import {
  createEmptyCohort,
  stringifyFilters,
} from '../../ExplorerCohort/utils';
import BaseModal from './BaseModal';

/**
 * @param {object} prop
 * @param {ExplorerCohort[]} prop.cohorts
 * @param {(id: number) => void} prop.onAddCohort
 * @param {() => void} prop.onClose
 */
export default function CohortAddForm({ cohorts, onAddCohort, onClose }) {
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
    <BaseModal title="Select a saved Cohort to add" onClose={onClose}>
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
    </BaseModal>
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
