import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import Button from '../components/Button';
import SimpleInputField from '../components/SimpleInputField';
import { CohortDetailsModal, ConsortiumRequestModal } from './Modals';
import { combineRequestsInfo } from './utils';
import './DataRequest.css';
import './typedef';

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
export default function ResearchUpdateForm({ data }) {
  const history = useHistory();
  const handleBack = () => history.push('/');

  const { submittedAt, completedAt, state } = combineRequestsInfo(
    data.requests,
  );
  const isEditable = ['NOT_SUBMITTED', 'UPDATE_REQUESTED'].includes(state);

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
  const [showDataRequest, setShowDataRequest] = useState(false);
  const [selectedDataRequest, setSelectedDataRequest] = useState(null);

  const isSubmitAllowed =
    isEditable &&
    (projectData.name !== data.name ||
      projectData.description !== data.description);
  const handleProjectSubmit = () => alert(JSON.stringify(projectData, null, 2));

  return (
    <div className="data-request">
      <div className="data-request__header">
        <div className="data-request__header__title">
          <h1>Data Requests for Research (ID: {data.id})</h1>
        </div>
        <p className="data-request__header__date">
          Sumitted date: {submittedAt}
        </p>
        <p className="data-request__header__date">
          Completed date: {completedAt}
        </p>
      </div>
      <div className="data-request__body">
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
                  </>
                }
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
              {data.requests.map((request, i) => (
                <Fragment key={request.consortium}>
                  <SimpleInputField
                    label="Data Requests"
                    input={
                      <input
                        value={`Consortium: ${request.consortium}`}
                        disabled
                        onChange={undefined}
                        style={i > 0 ? { marginTop: '1rem' } : undefined}
                      />
                    }
                  />
                  <div
                    className="data-request-form__input__action"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <span
                      className="data-request-form__input__action-state"
                      // @ts-ignore
                      state={request.state}
                    >
                      {request.state.replace('_', ' ').toLowerCase()}
                    </span>
                    <button
                      className="data-request-form__input__action-button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDataRequest(true);
                        setSelectedDataRequest(request);
                      }}
                    >
                      See Details
                    </button>
                  </div>
                </Fragment>
              ))}
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
            style={{ justifyContent: 'flex-end' }}
          >
            <CohortDetailsModal
              cohorts={cohorts}
              onClose={() => setShowCohortDetail(false)}
            />
          </div>
        )}
        {showDataRequest && (
          <div
            className="data-request-overlay"
            style={{ justifyContent: 'flex-end' }}
          >
            <ConsortiumRequestModal
              request={selectedDataRequest}
              onSubmit={() => {}}
              onClose={() => {
                setShowDataRequest(false);
                setSelectedDataRequest(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

ResearchUpdateForm.propTypes = {
  data: PropTypes.object,
};
