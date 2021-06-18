import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import Button from '../components/Button';
import SimpleInputField from '../components/SimpleInputField';
import { FormLayout } from './Layouts';
import { CohortExtraForm, CohortDetailsForm } from './ExtraForms';
import { combineRequestsInfo } from './utils';
import './typedef';

/**
 * @typedef {object} DataRequestCreateResearchData
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {ExplorerCohort[]} cohorts
 */

export function CreateResearchForm({ cohorts }) {
  const history = useHistory();
  const handleBack = () => history.push('/');

  const layoutHeader = {
    title: 'Data Requests for new Research',
  };

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
    <FormLayout header={layoutHeader}>
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
              <>
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
                <div className="data-request-form__input__action">
                  <button
                    className="data-request-form__input__action-button"
                    onClick={() => setShowExtra(true)}
                  >
                    Add Cohort
                  </button>
                </div>
              </>
            }
          />

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
          style={{ justifyContent: 'right' }}
        >
          <CohortExtraForm
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
    </FormLayout>
  );
}

/**
 * @typedef {object} DataRequestUpdateResearchData
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {DataRequest[]} requests
 * @property {{ name: string; description: string; filters: string }[]} searches
 */

/**
 * @param {object} prop
 * @param {DataRequestUpdateResearchData} prop.data
 */
export function UpdateResearchForm({ data }) {
  const history = useHistory();
  const handleBack = () => history.push('/');

  const { submittedAt, completedAt, state } = combineRequestsInfo(
    data.requests,
  );
  const isEditable = ['NOT_SUBMITTED', 'UPDATE_REQUESTED'].includes(state);
  const layoutHeader = {
    title: `Data Requests for Research (ID: ${data.id})`,
    dates: { submittedAt, completedAt },
  };

  const [projectData, setProjectData] = useState({
    name: data.name,
    description: data.description,
  });
  const searchValues = [];
  const cohorts = /**  @type {ExplorerCohort} */ [];
  for (const search of data.searches) {
    searchValues.push({ label: search.name, value: search.name });
    cohorts.push({ ...search, filters: JSON.parse(search.filters) });
  }
  const [showCohortDetail, setShowCohortDetail] = useState(false);

  const isSubmitAllowed =
    isEditable &&
    (projectData.name !== data.name ||
      projectData.description !== data.description);
  const handleProjectSubmit = () => alert(JSON.stringify(projectData, null, 2));

  return (
    <FormLayout header={layoutHeader}>
      <div className="data-request-form">
        <div className="data-request-form__main">
          <form>
            <SimpleInputField
              label="Research Title"
              input={
                <input
                  type="text"
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                <>
                  <Select
                    menuIsOpen={false}
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                    }}
                    isClearable={false}
                    isMulti
                    isSearchable={false}
                    value={searchValues}
                    styles={{
                      multiValueLabel: (base) => {
                        return { ...base, paddingRight: 6 };
                      },
                      multiValueRemove: (base) => {
                        return { ...base, display: 'none' };
                      },
                    }}
                  />
                  <div className="data-request-form__input__action">
                    <button
                      className="data-request-form__input__action-button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCohortDetail(true);
                      }}
                    >
                      See Details
                    </button>
                  </div>
                </>
              }
            />
          </form>
          <div className="data-request-form__button-group">
            <Button label="Back" buttonType="default" onClick={handleBack} />
            <Button
              label="Submit"
              buttonType="primary"
              enabled={isSubmitAllowed}
              onClick={handleProjectSubmit}
            />
          </div>
        </div>
      </div>
      {showCohortDetail && (
        <div
          className="data-request-overlay"
          style={{ justifyContent: 'right' }}
        >
          <CohortDetailsForm
            cohorts={cohorts}
            onClose={() => setShowCohortDetail(false)}
          />
        </div>
      )}
    </FormLayout>
  );
}

UpdateResearchForm.propTypes = {
  data: PropTypes.object,
};
