import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import Button from '../components/Button';
import SimpleInputField from '../components/SimpleInputField';
import { CohortAddModal } from './Modals';
import './DataRequest.css';
import './typedef';

/**
 * @param {object} prop
 * @param {ExplorerCohort[]} prop.cohorts
 */
export default function ResearchCreateForm({ cohorts }) {
  const history = useHistory();
  const handleBack = () => history.push('/');

  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    searchIds: [],
  });
  const searchValues = [];
  for (const { id, name } of cohorts)
    for (const searchId of projectData.searchIds)
      if (id === searchId) searchValues.push({ label: name, value: id });
  const isCreateAllowed =
    projectData.name !== '' &&
    projectData.description !== '' &&
    projectData.searchIds.length > 0;
  const handleProjectCreate = () => alert(JSON.stringify(projectData, null, 2));

  const [showExtra, setShowExtra] = useState(false);

  return (
    <div className="data-request">
      <div className="data-request__header">
        <div className="data-request__header__title">
          <h1>Data Requests for new Research</h1>
        </div>
      </div>
      <div className="data-request__body">
        <div className="data-request-form">
          <div className="data-request-form__main">
            <SimpleInputField
              label="Research Title"
              input={
                <input
                  type="text"
                  value={projectData.name}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              }
            />
            <SimpleInputField
              label="Research Description"
              input={
                <textarea
                  value={projectData.description}
                  onChange={(e) =>
                    setProjectData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              }
            />
            <SimpleInputField
              label="Research Cohort"
              input={
                <Select
                  menuIsOpen={false}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  isMulti
                  isClearable
                  isSearchable={false}
                  value={searchValues}
                  onChange={(_, actionMeta) => {
                    switch (actionMeta.action) {
                      case 'clear':
                        setProjectData((prev) => ({ ...prev, searchIds: [] }));
                        break;
                      case 'remove-value':
                        setProjectData((prev) => ({
                          ...prev,
                          searchIds: prev.searchIds.filter(
                            (id) => id !== actionMeta.removedValue.value,
                          ),
                        }));
                    }
                  }}
                />
              }
            />
            <div className="data-request-form__input__action">
              <button
                className="data-request-form__input__action-button"
                onClick={() => setShowExtra(true)}
              >
                Add Cohort
              </button>
            </div>

            <div className="data-request-form__button-group">
              <Button label="Back" buttonType="default" onClick={handleBack} />
              <Button
                label="Create"
                buttonType="primary"
                enabled={isCreateAllowed}
                onClick={handleProjectCreate}
              />
            </div>
          </div>
        </div>
        {showExtra && (
          <div
            className="data-request-overlay"
            style={{ justifyContent: 'flex-end' }}
          >
            <CohortAddModal
              cohorts={cohorts.filter((cohort) => {
                for (const id of projectData.searchIds)
                  if (id === cohort.id) return false;
                return true;
              })}
              onAddCohort={(id) =>
                setProjectData((prev) => ({
                  ...prev,
                  searchIds: [...prev.searchIds, id],
                }))
              }
              onClose={() => setShowExtra(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

ResearchCreateForm.propTypes = {
  data: PropTypes.object,
};
