import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import SimpleInputField from '../components/SimpleInputField';
import { FormLayout } from './Layouts';
import { combineRequestsInfo } from './utils';
import './typedef';

/**
 * @typedef {object} DataRequestCreateResearchData
 * @property {number} id
 * @property {string} name
 * @property {string} description
 */

export function CreateResearchForm() {
  const history = useHistory();
  const handleBack = () => history.push('/');

  const layoutHeader = {
    title: 'Data Requests for new Research',
  };

  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
  });
  const isCreateAllowed =
    projectData.name !== '' && projectData.description !== '';
  const handleProjectCreate = () => alert(JSON.stringify(projectData, null, 2));

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
    </FormLayout>
  );
}

UpdateResearchForm.propTypes = {
  data: PropTypes.object,
};
