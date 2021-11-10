import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import SimpleInputField from '../../components/SimpleInputField';
import { stringifyFilters } from '../../ExplorerCohort/utils';
import BaseModal from './BaseModal';

/**
 * @param {object} prop
 * @param {ExplorerCohort[]} prop.cohorts
 * @param {() => void} prop.onClose
 */
export default function CohortDetailsModal({ cohorts, onClose }) {
  const options = cohorts.map((cohort) => ({
    label: cohort.name,
    value: cohort,
  }));
  const [selected, setSelected] = useState(options[0]);

  return (
    <BaseModal title="Details on a selected Cohort" onClose={onClose}>
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
    </BaseModal>
  );
}

CohortDetailsModal.propTypes = {
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
