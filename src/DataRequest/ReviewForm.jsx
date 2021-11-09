import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormLayout } from './Layouts';
import Button from '../components/Button';
import SimpleInputField from '../components/SimpleInputField';
import { ChooseActionForm } from './ActionForms';
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

  const [showChooseAction, setShowChooseAction] = useState(false);
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
          <SimpleInputField
            label="Principal Invesigator"
            input={
              <input
                type="text"
                disabled
                value={`${data.researcher.first_name} ${data.researcher.last_name}`}
              />
            }
          />
          <SimpleInputField
            label="Institution"
            input={
              <input type="text" disabled value={data.researcher.institution} />
            }
          />
          {data.attributes.map((attr) => (
            <SimpleInputField
              key={attr.name}
              label={attr.name}
              input={<input value={attr.value} type={attr.type} disabled />}
            />
          ))}
          <div className="data-request-form__button-group">
            <Button label="Back" buttonType="default" onClick={handleBack} />
            {data.state === 'UNDER_REVIEW' && (
              <Button
                label="Choose Action"
                buttonType="secondary"
                onClick={() => setShowChooseAction(true)}
              />
            )}
          </div>
        </div>
        {showChooseAction && (
          <div
            className="data-request-overlay"
            style={{ justifyContent: 'flex-end' }}
          >
            <ChooseActionForm
              onSubmit={() => {}}
              onClose={() => setShowChooseAction(false)}
            />
          </div>
        )}
      </div>
    </FormLayout>
  );
}

ReviewForm.propTypes = {
  data: PropTypes.object,
};

export default ReviewForm;
