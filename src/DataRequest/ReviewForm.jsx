import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormLayout } from './Layouts';
import Button from '../components/Button';
import SimpleInputField from '../components/SimpleInputField';
import { formatTimestamp } from './utils';
import './typedef';

/**
 * @typedef {object} DataRequestReviewData
 * @property {number} id
 * @property {string} consortium
 * @property {DataRequestState} state
 * @property {Timestamp} submitted_at
 * @property {Timestamp} completed_at
 * @property {Attribute[]} attributes
 * @property {ReviewerActionType[]} available_use_actions
 * @property {{ id: number; name: string; description: string}} project
 * @property {User} researcher
 */

/**
 * @param {object} props
 * @param {DataRequestReviewData} props.data
 */
function ReviewForm({ data }) {
  const history = useHistory();
  const handleBack = () => history.push('/');

  const layoutHeader = {
    title: `Review Data Request (ID: ${data.id})`,
    dates: {
      submittedAt: formatTimestamp(data.submitted_at),
      completedAt: formatTimestamp(data.completed_at),
    },
  };
  return (
    <FormLayout header={layoutHeader}>
      <div className="data-request-form">
        <div className="data-request-form__main">
          <SimpleInputField
            label="Research Title"
            input={<input type="text" disabled value={data.project.name} />}
          />
          <SimpleInputField
            label="Research Description"
            input={<textarea disabled value={data.project.description} />}
          />
          <div className="data-request-form__button-group">
            <Button label="Back" buttonType="default" onClick={handleBack} />
            <Button label="Choose Action" buttonType="secondary" />
          </div>
        </div>
      </div>
    </FormLayout>
  );
}

ReviewForm.propTypes = {
  data: PropTypes.object,
};

export default ReviewForm;
